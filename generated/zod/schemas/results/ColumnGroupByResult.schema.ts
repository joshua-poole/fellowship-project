import * as z from 'zod';
export const ColumnGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  default: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tableId: z.string(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    type: z.number(),
    description: z.number(),
    default: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    tableId: z.number(),
    table: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    default: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    tableId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    description: z.string().nullable(),
    default: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    tableId: z.string().nullable()
  }).nullable().optional()
}));