import * as z from 'zod';
export const TableGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  baseId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    baseId: z.number(),
    base: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    columns: z.number(),
    rows: z.number(),
    views: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    baseId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    baseId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));