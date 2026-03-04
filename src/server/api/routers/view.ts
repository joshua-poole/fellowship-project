import { TRPCError } from "@trpc/server";
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

export const viewRouter = createTRPCRouter({
  getByTable: protectedProcedure
    .input(ViewGetByTableInputSchema)
    .output(ViewGetByTableOutputSchema)
    .query(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - fetch views for a table ordered by `order`
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  create: protectedProcedure
    .input(ViewCreateInputSchema)
    .output(ViewCreateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - create view, set order to max+1
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  update: protectedProcedure
    .input(ViewUpdateInputSchema)
    .output(ViewUpdateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - update view name/order/config
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  delete: protectedProcedure
    .input(ViewDeleteInputSchema)
    .output(ViewDeleteOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),
});
