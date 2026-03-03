import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  default: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional()
}).strict();
export const ColumnMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ColumnMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnMinOrderByAggregateInput>;
export const ColumnMinOrderByAggregateInputObjectZodSchema = makeSchema();
