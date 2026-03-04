import { TRPCError } from "@trpc/server";
import { tableId, columnId, viewId } from "~/lib/ids";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  TableGetByIdInputSchema,
  TableGetByIdOutputSchema,
  TableCreateInputSchema,
  TableCreateOutputSchema,
  TableUpdateInputSchema,
  TableUpdateOutputSchema,
  TableDeleteInputSchema,
  TableDeleteOutputSchema,
} from "~/types/table";

export const tableRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(TableGetByIdInputSchema)
    .output(TableGetByIdOutputSchema)
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: {
          id: input.id,
          base: { userId: ctx.session.user.id },
        },
        select: {
          id: true,
          name: true,
          order: true,
          baseId: true,
          columns: {
            select: { id: true, name: true, type: true, order: true },
            orderBy: { order: "asc" },
          },
          views: {
            select: { id: true, name: true, type: true, order: true },
            orderBy: { order: "asc" },
          },
        },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      return table;
    }),

  create: protectedProcedure
    .input(TableCreateInputSchema)
    .output(TableCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const base = await ctx.db.base.findFirst({
        where: { id: input.baseId, userId: ctx.session.user.id },
      });

      if (!base) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Base not found" });
      }

      const tableCount = await ctx.db.table.count({
        where: { baseId: input.baseId },
      });

      const last = await ctx.db.table.findFirst({
        where: { baseId: input.baseId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const table = await ctx.db.table.create({
        data: {
          id: tableId(),
          name: input.name ?? `Table ${tableCount + 1}`,
          order: (last?.order ?? -1) + 1,
          baseId: input.baseId,
          columns: {
            create: [
              { id: columnId(), name: "Name", type: "TEXT", order: 0 },
              { id: columnId(), name: "Notes", type: "TEXT", order: 1 },
              { id: columnId(), name: "Status", type: "TEXT", order: 2 },
            ],
          },
          views: {
            create: [{ id: viewId(), name: "Grid view", type: "grid", order: 0 }],
          },
        },
      });

      return { id: table.id, name: table.name, order: table.order };
    }),

  update: protectedProcedure
    .input(TableUpdateInputSchema)
    .output(TableUpdateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: {
          id: input.id,
          base: { userId: ctx.session.user.id },
        },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      return await ctx.db.table.update({
        where: { id: input.id },
        data: {
          ...(input.name !== undefined && { name: input.name }),
          ...(input.order !== undefined && { order: input.order }),
        },
      });
    }),

  delete: protectedProcedure
    .input(TableDeleteInputSchema)
    .output(TableDeleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: {
          id: input.id,
          base: { userId: ctx.session.user.id },
        },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      await ctx.db.table.delete({ where: { id: input.id } });
      return true;
    }),
});
