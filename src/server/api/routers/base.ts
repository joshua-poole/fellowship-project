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

export const baseRouter = createTRPCRouter({
  getAll: protectedProcedure
    .output(z.array(BaseGetAllOutputSchema))
    .query(async ({ ctx }) => {
      return await ctx.db.base.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { lastOpenedAt: "desc" },
      });
    }),

  getById: protectedProcedure
    .input(BaseGetByIdInputSchema)
    .output(BaseGetByIdOutputSchema)
    .query(async ({ ctx, input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  create: protectedProcedure
    .input(BaseCreateInputSchema)
    .output(BaseCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  update: protectedProcedure
    .input(BaseUpdateInputSchema)
    .output(BaseUpdateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  delete: protectedProcedure
    .input(BaseDeleteInputSchema)
    .output(BaseDeleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),
});
