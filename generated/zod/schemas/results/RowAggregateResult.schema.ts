import * as z from 'zod';
export const RowAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    tableId: z.number(),
    table: z.number(),
    values: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    tableId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    tableId: z.string().nullable()
  }).nullable().optional()});