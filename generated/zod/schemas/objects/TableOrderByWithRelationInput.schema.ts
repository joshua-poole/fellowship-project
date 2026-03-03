import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BaseOrderByWithRelationInputObjectSchema as BaseOrderByWithRelationInputObjectSchema } from './BaseOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ColumnOrderByRelationAggregateInputObjectSchema as ColumnOrderByRelationAggregateInputObjectSchema } from './ColumnOrderByRelationAggregateInput.schema';
import { RowOrderByRelationAggregateInputObjectSchema as RowOrderByRelationAggregateInputObjectSchema } from './RowOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  baseId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  base: z.lazy(() => BaseOrderByWithRelationInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  columns: z.lazy(() => ColumnOrderByRelationAggregateInputObjectSchema).optional(),
  rows: z.lazy(() => RowOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const TableOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.TableOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.TableOrderByWithRelationInput>;
export const TableOrderByWithRelationInputObjectZodSchema = makeSchema();
