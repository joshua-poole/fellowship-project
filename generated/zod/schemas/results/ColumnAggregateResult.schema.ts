import * as z from 'zod';
export const ColumnAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    type: z.number(),
    order: z.number(),
    description: z.number(),
    defaultValue: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    tableId: z.number(),
    table: z.number()
  }).optional(),
  _sum: z.object({
    order: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    order: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    order: z.number().int().nullable(),
    description: z.string().nullable(),
    defaultValue: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    tableId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    order: z.number().int().nullable(),
    description: z.string().nullable(),
    defaultValue: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    tableId: z.string().nullable()
  }).nullable().optional()});