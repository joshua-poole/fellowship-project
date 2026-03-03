import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TableOrderByRelationAggregateInputObjectSchema as TableOrderByRelationAggregateInputObjectSchema } from './TableOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tables: z.lazy(() => TableOrderByRelationAggregateInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const BaseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BaseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseOrderByWithRelationInput>;
export const BaseOrderByWithRelationInputObjectZodSchema = makeSchema();
