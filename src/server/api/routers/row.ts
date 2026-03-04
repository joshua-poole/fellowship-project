import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  RowGetByTableInputSchema,
  RowGetByTableOutputSchema,
  RowCreateInputSchema,
  RowCreateOutputSchema,
  RowBulkCreateInputSchema,
  RowBulkCreateOutputSchema,
  RowUpdateCellInputSchema,
  RowUpdateCellOutputSchema,
  RowDeleteInputSchema,
  RowDeleteOutputSchema,
} from "~/types/row";

export const rowRouter = createTRPCRouter({
  getByTable: protectedProcedure
    .input(RowGetByTableInputSchema)
    .output(RowGetByTableOutputSchema)
    .query(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - paginated fetch with cursor, search, sort, filters
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  create: protectedProcedure
    .input(RowCreateInputSchema)
    .output(RowCreateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - create single row, set order to max+1
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  bulkCreate: protectedProcedure
    .input(RowBulkCreateInputSchema)
    .output(RowBulkCreateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - bulk insert rows with faker data
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  updateCell: protectedProcedure
    .input(RowUpdateCellInputSchema)
    .output(RowUpdateCellOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - update single cell value in row's JSON
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  delete: protectedProcedure
    .input(RowDeleteInputSchema)
    .output(RowDeleteOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),
});
