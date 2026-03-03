import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BaseOrderByWithRelationInputObjectSchema as BaseOrderByWithRelationInputObjectSchema } from './BaseOrderByWithRelationInput.schema';
import { ColumnOrderByRelationAggregateInputObjectSchema as ColumnOrderByRelationAggregateInputObjectSchema } from './ColumnOrderByRelationAggregateInput.schema';
import { RowOrderByRelationAggregateInputObjectSchema as RowOrderByRelationAggregateInputObjectSchema } from './RowOrderByRelationAggregateInput.schema';
import { ViewOrderByRelationAggregateInputObjectSchema as ViewOrderByRelationAggregateInputObjectSchema } from './ViewOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  baseId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  base: z.lazy(() => BaseOrderByWithRelationInputObjectSchema).optional(),
  columns: z.lazy(() => ColumnOrderByRelationAggregateInputObjectSchema).optional(),
  rows: z.lazy(() => RowOrderByRelationAggregateInputObjectSchema).optional(),
  views: z.lazy(() => ViewOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const TableOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.TableOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.TableOrderByWithRelationInput>;
export const TableOrderByWithRelationInputObjectZodSchema = makeSchema();
