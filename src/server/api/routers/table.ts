import { TRPCError } from "@trpc/server";
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
    .query(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - fetch table with columns and views
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  create: protectedProcedure
    .input(TableCreateInputSchema)
    .output(TableCreateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement - create table with default columns/rows (faker data)
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  update: protectedProcedure
    .input(TableUpdateInputSchema)
    .output(TableUpdateOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),

  delete: protectedProcedure
    .input(TableDeleteInputSchema)
    .output(TableDeleteOutputSchema)
    .mutation(async ({ ctx: _ctx, input: _input }) => {
      // TODO: implement
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED", message: "Not implemented" });
    }),
});
