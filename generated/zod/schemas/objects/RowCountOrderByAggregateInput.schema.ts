import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  values: SortOrderSchema.optional()
}).strict();
export const RowCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RowCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RowCountOrderByAggregateInput>;
export const RowCountOrderByAggregateInputObjectZodSchema = makeSchema();
