import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  tableId: z.literal(true).optional()
}).strict();
export const RowMinAggregateInputObjectSchema: z.ZodType<Prisma.RowMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RowMinAggregateInputType>;
export const RowMinAggregateInputObjectZodSchema = makeSchema();
