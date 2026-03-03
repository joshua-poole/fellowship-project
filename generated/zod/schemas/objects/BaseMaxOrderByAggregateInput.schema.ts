import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const BaseMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BaseMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseMaxOrderByAggregateInput>;
export const BaseMaxOrderByAggregateInputObjectZodSchema = makeSchema();
