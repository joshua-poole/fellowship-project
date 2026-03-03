import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  type: z.literal(true).optional(),
  order: z.literal(true).optional(),
  description: z.literal(true).optional(),
  defaultValue: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  tableId: z.literal(true).optional()
}).strict();
export const ColumnMinAggregateInputObjectSchema: z.ZodType<Prisma.ColumnMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ColumnMinAggregateInputType>;
export const ColumnMinAggregateInputObjectZodSchema = makeSchema();
