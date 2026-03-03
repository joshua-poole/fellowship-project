import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BaseCountOrderByAggregateInputObjectSchema as BaseCountOrderByAggregateInputObjectSchema } from './BaseCountOrderByAggregateInput.schema';
import { BaseMaxOrderByAggregateInputObjectSchema as BaseMaxOrderByAggregateInputObjectSchema } from './BaseMaxOrderByAggregateInput.schema';
import { BaseMinOrderByAggregateInputObjectSchema as BaseMinOrderByAggregateInputObjectSchema } from './BaseMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => BaseCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BaseMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BaseMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BaseOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BaseOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseOrderByWithAggregationInput>;
export const BaseOrderByWithAggregationInputObjectZodSchema = makeSchema();
