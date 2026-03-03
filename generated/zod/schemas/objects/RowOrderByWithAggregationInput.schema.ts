import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RowCountOrderByAggregateInputObjectSchema as RowCountOrderByAggregateInputObjectSchema } from './RowCountOrderByAggregateInput.schema';
import { RowMaxOrderByAggregateInputObjectSchema as RowMaxOrderByAggregateInputObjectSchema } from './RowMaxOrderByAggregateInput.schema';
import { RowMinOrderByAggregateInputObjectSchema as RowMinOrderByAggregateInputObjectSchema } from './RowMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  values: SortOrderSchema.optional(),
  _count: z.lazy(() => RowCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RowMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RowMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RowOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RowOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RowOrderByWithAggregationInput>;
export const RowOrderByWithAggregationInputObjectZodSchema = makeSchema();
