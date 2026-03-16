import { TRPCError } from "@trpc/server";
import { columnId } from "~/lib/ids";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  ColumnGetByTableInputSchema,
  ColumnGetByTableOutputSchema,
  ColumnCreateInputSchema,
  ColumnCreateOutputSchema,
  ColumnUpdateInputSchema,
  ColumnUpdateOutputSchema,
  ColumnDeleteInputSchema,
  ColumnDeleteOutputSchema,
} from "~/types/schemas/column";

export const columnRouter = createTRPCRouter({
  getByTable: protectedProcedure
    .input(ColumnGetByTableInputSchema)
    .output(ColumnGetByTableOutputSchema)
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: {
          id: input.tableId,
          base: { userId: ctx.session.user.id },
        },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      return await ctx.db.column.findMany({
        where: { tableId: input.tableId },
        orderBy: { order: "asc" },
        select: { id: true, name: true, type: true, order: true, description: true, defaultValue: true },
      });
    }),

  create: protectedProcedure
    .input(ColumnCreateInputSchema)
    .output(ColumnCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: {
          id: input.tableId,
          base: { userId: ctx.session.user.id },
        },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      let newOrder: number;
      if (input.order !== undefined) {
        // Shift existing columns at or after this order
        await ctx.db.column.updateMany({
          where: { tableId: input.tableId, order: { gte: input.order } },
          data: { order: { increment: 1 } },
        });
        newOrder = input.order;
      } else {
        const last = await ctx.db.column.findFirst({
          where: { tableId: input.tableId },
          orderBy: { order: "desc" },
          select: { order: true },
        });
        newOrder = (last?.order ?? -1) + 1;
      }

      const { order: _order, ...rest } = input;
      return await ctx.db.column.create({
        data: {
          ...rest,
          id: columnId(),
          order: newOrder,
        },
        select: { id: true, name: true, type: true, order: true },
      });
    }),

  update: protectedProcedure
    .input(ColumnUpdateInputSchema)
    .output(ColumnUpdateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const column = await ctx.db.column.findFirst({
        where: {
          id: input.id,
          table: { base: { userId: ctx.session.user.id } },
        },
      });

      if (!column) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Column not found" });
      }

      const { id, ...data } = input;
      return await ctx.db.column.update({
        where: { id },
        data,
        select: { id: true, name: true, type: true, order: true },
      });
    }),

  delete: protectedProcedure
    .input(ColumnDeleteInputSchema)
    .output(ColumnDeleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const column = await ctx.db.column.findFirst({
        where: {
          id: input.id,
          table: { base: { userId: ctx.session.user.id } },
        },
      });

      if (!column) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Column not found" });
      }

      if (column.order === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Cannot delete the primary column" });
      }

      await ctx.db.$transaction([
        // Remove the column
        ctx.db.column.delete({ where: { id: input.id } }),
        // Close the gap in column ordering
        ctx.db.column.updateMany({
          where: { tableId: column.tableId, order: { gt: column.order } },
          data: { order: { decrement: 1 } },
        }),
        // Strip the deleted column's key from every row's JSONB values
        ctx.db.$executeRawUnsafe(
          `UPDATE "Row" SET "values" = "values" - $1 WHERE "tableId" = $2`,
          input.id,
          column.tableId,
        ),
        // Clean up view references to this column
        ctx.db.viewFilter.deleteMany({ where: { columnId: input.id, view: { tableId: column.tableId } } }),
        ctx.db.viewSort.deleteMany({ where: { columnId: input.id, view: { tableId: column.tableId } } }),
        ctx.db.viewHiddenColumn.deleteMany({ where: { columnId: input.id, view: { tableId: column.tableId } } }),
      ]);
      return true;
    }),
});
