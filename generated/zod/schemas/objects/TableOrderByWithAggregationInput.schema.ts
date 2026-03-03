import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TableCountOrderByAggregateInputObjectSchema as TableCountOrderByAggregateInputObjectSchema } from './TableCountOrderByAggregateInput.schema';
import { TableMaxOrderByAggregateInputObjectSchema as TableMaxOrderByAggregateInputObjectSchema } from './TableMaxOrderByAggregateInput.schema';
import { TableMinOrderByAggregateInputObjectSchema as TableMinOrderByAggregateInputObjectSchema } from './TableMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  baseId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => TableCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => TableMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => TableMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const TableOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.TableOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.TableOrderByWithAggregationInput>;
export const TableOrderByWithAggregationInputObjectZodSchema = makeSchema();
