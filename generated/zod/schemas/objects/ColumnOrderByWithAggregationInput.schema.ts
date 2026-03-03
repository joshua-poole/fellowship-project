import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ColumnCountOrderByAggregateInputObjectSchema as ColumnCountOrderByAggregateInputObjectSchema } from './ColumnCountOrderByAggregateInput.schema';
import { ColumnAvgOrderByAggregateInputObjectSchema as ColumnAvgOrderByAggregateInputObjectSchema } from './ColumnAvgOrderByAggregateInput.schema';
import { ColumnMaxOrderByAggregateInputObjectSchema as ColumnMaxOrderByAggregateInputObjectSchema } from './ColumnMaxOrderByAggregateInput.schema';
import { ColumnMinOrderByAggregateInputObjectSchema as ColumnMinOrderByAggregateInputObjectSchema } from './ColumnMinOrderByAggregateInput.schema';
import { ColumnSumOrderByAggregateInputObjectSchema as ColumnSumOrderByAggregateInputObjectSchema } from './ColumnSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  order: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  defaultValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  _count: z.lazy(() => ColumnCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ColumnAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ColumnMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ColumnMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ColumnSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ColumnOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ColumnOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnOrderByWithAggregationInput>;
export const ColumnOrderByWithAggregationInputObjectZodSchema = makeSchema();
