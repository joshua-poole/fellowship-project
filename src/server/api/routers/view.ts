import { TRPCError } from "@trpc/server";
import { type z } from "zod";
import { viewId, viewFilterId, viewSortId, viewHiddenColumnId } from "~/lib/ids";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  ViewGetByTableInputSchema,
  ViewGetByTableOutputSchema,
  ViewCreateInputSchema,
  ViewCreateOutputSchema,
  ViewUpdateInputSchema,
  ViewUpdateOutputSchema,
  ViewDeleteInputSchema,
  ViewDeleteOutputSchema,
} from "~/types/view";

type ViewOutput = z.infer<typeof ViewCreateOutputSchema>;

const viewSelect = {
  id: true,
  name: true,
  type: true,
  order: true,
  search: true,
  filters: {
    select: { id: true, columnId: true, operator: true, value: true },
  },
  sorts: {
    select: { id: true, columnId: true, direction: true, order: true },
    orderBy: { order: "asc" as const },
  },
  hiddenColumns: {
    select: { id: true, columnId: true },
  },
} as const;

export const viewRouter = createTRPCRouter({
  getByTable: protectedProcedure
    .input(ViewGetByTableInputSchema)
    .output(ViewGetByTableOutputSchema)
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: { id: input.tableId, base: { userId: ctx.session.user.id } },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      const views = await ctx.db.view.findMany({
        where: { tableId: input.tableId },
        orderBy: { order: "asc" },
        select: viewSelect,
      });

      return views as ViewOutput[];
    }),

  create: protectedProcedure
    .input(ViewCreateInputSchema)
    .output(ViewCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: { id: input.tableId, base: { userId: ctx.session.user.id } },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      const last = await ctx.db.view.findFirst({
        where: { tableId: input.tableId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const view = await ctx.db.view.create({
        data: {
          id: viewId(),
          name: input.name ?? "Grid view",
          type: "grid",
          order: (last?.order ?? -1) + 1,
          tableId: input.tableId,
        },
        select: viewSelect,
      });

      return view as ViewOutput;
    }),

  update: protectedProcedure
    .input(ViewUpdateInputSchema)
    .output(ViewUpdateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.view.findFirst({
        where: { id: input.id, table: { base: { userId: ctx.session.user.id } } },
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "View not found" });
      }

      const { id, filters, sorts, hiddenColumns, ...rest } = input;

      /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- Prisma adapter types unresolvable by ESLint */

      // Delete and recreate filters if provided
      if (filters !== undefined) {
        await ctx.db.viewFilter.deleteMany({ where: { viewId: id } });
        if (filters.length > 0) {
          await ctx.db.viewFilter.createMany({
            data: filters.map((f) => ({
              id: viewFilterId(),
              viewId: id,
              columnId: f.columnId,
              operator: f.operator,
              value: f.value ?? null,
            })),
          });
        }
      }

      // Delete and recreate sorts if provided
      if (sorts !== undefined) {
        await ctx.db.viewSort.deleteMany({ where: { viewId: id } });
        if (sorts.length > 0) {
          await ctx.db.viewSort.createMany({
            data: sorts.map((s, i) => ({
              id: viewSortId(),
              viewId: id,
              columnId: s.columnId,
              direction: s.direction,
              order: s.order ?? i,
            })),
          });
        }
      }

      // Delete and recreate hidden columns if provided
      if (hiddenColumns !== undefined) {
        await ctx.db.viewHiddenColumn.deleteMany({ where: { viewId: id } });
        if (hiddenColumns.length > 0) {
          await ctx.db.viewHiddenColumn.createMany({
            data: hiddenColumns.map((columnId) => ({
              id: viewHiddenColumnId(),
              viewId: id,
              columnId,
            })),
          });
        }
      }

      /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */

      const view = await ctx.db.view.update({
        where: { id },
        data: rest,
        select: viewSelect,
      });

      return view as ViewOutput;
    }),

  delete: protectedProcedure
    .input(ViewDeleteInputSchema)
    .output(ViewDeleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const view = await ctx.db.view.findFirst({
        where: { id: input.id, table: { base: { userId: ctx.session.user.id } } },
      });

      if (!view) {
        throw new TRPCError({ code: "NOT_FOUND", message: "View not found" });
      }

      await ctx.db.view.delete({ where: { id: input.id } });
      return true;
    }),
});
