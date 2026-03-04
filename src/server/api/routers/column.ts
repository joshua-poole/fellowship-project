import { TRPCError } from "@trpc/server";
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
    .query(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - fetch columns ordered by `order`
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  create: protectedProcedure
    .input(ColumnCreateInputSchema)
    .output(ColumnCreateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - create column, set order to max+1
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  update: protectedProcedure
    .input(ColumnUpdateInputSchema)
    .output(ColumnUpdateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  delete: protectedProcedure
    .input(ColumnDeleteInputSchema)
    .output(ColumnDeleteOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),
});
