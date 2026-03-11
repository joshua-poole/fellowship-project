import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  BaseGetAllOutputSchema,
  BaseGetByIdInputSchema,
  BaseGetByIdOutputSchema,
  BaseCreateInputSchema,
  BaseCreateOutputSchema,
  BaseUpdateInputSchema,
  BaseUpdateOutputSchema,
  BaseDeleteInputSchema,
  BaseDeleteOutputSchema,
} from "~/types/base";
import { z } from "zod";
import { baseId, tableId, columnId, viewId } from "~/lib/ids";

export const baseRouter = createTRPCRouter({
  getAll: protectedProcedure
    .output(z.array(BaseGetAllOutputSchema))
    .query(async ({ ctx }) => {
      return await ctx.db.base.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { lastOpenedAt: "desc" },
        select: { id: true, name: true, lastOpenedAt: true },
      });
    }),

  getById: protectedProcedure
    .input(BaseGetByIdInputSchema)
    .output(BaseGetByIdOutputSchema)
    .query(async ({ ctx, input }) => {
      const base = await ctx.db.base.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
        select: {
          id: true,
          name: true,
          color: true,
          lastOpenedAt: true,
          tables: {
            select: { id: true, name: true, order: true },
            orderBy: { order: "asc" },
          },
        },
      });

      if (!base) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Base not found" });
      }

      await ctx.db.base.update({
        where: { id: input.id },
        data: { lastOpenedAt: new Date() },
      });

      return base;
    }),

  create: protectedProcedure
    .input(BaseCreateInputSchema)
    .output(BaseCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const base = await ctx.db.base.create({
        data: {
          id: baseId(),
          name: input.name,
          userId: ctx.session.user.id,
          tables: {
            create: {
              id: tableId(),
              name: "Table 1",
              order: 0,
              columns: {
                create: [
                  { id: columnId(), name: "Name", type: "TEXT", order: 0 },
                  { id: columnId(), name: "Notes", type: "TEXT", order: 1 },
                  { id: columnId(), name: "Status", type: "NUMBER", order: 2 },
                ],
              },
              views: {
                create: { id: viewId(), name: "Grid view", type: "grid", order: 0 },
              },
            },
          },
        },
      });

      return { id: base.id };
    }),

  update: protectedProcedure
    .input(BaseUpdateInputSchema)
    .output(BaseUpdateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const base = await ctx.db.base.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });

      if (!base) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Base not found" });
      }

      return await ctx.db.base.update({
        where: { id: input.id },
        data: { name: input.name, color: input.color as string },
        select: { id: true, name: true, color: true },
      });
    }),

  delete: protectedProcedure
    .input(BaseDeleteInputSchema)
    .output(BaseDeleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const base = await ctx.db.base.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      });

      if (!base) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Base not found" });
      }

      await ctx.db.base.delete({ where: { id: input.id } });
      return true;
    }),
});
