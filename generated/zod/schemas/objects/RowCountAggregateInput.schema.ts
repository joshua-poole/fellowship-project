import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  tableId: z.literal(true).optional(),
  values: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RowCountAggregateInputObjectSchema: z.ZodType<Prisma.RowCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RowCountAggregateInputType>;
export const RowCountAggregateInputObjectZodSchema = makeSchema();
