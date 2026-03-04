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
} from "~/types/column";

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

      const last = await ctx.db.column.findFirst({
        where: { tableId: input.tableId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      return await ctx.db.column.create({
        data: {
          ...input,
          id: columnId(),
          order: (last?.order ?? -1) + 1,
        },
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

      await ctx.db.column.delete({ where: { id: input.id } });
      return true;
    }),
});
