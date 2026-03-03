import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const BaseOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.BaseOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseOrderByRelationAggregateInput>;
export const BaseOrderByRelationAggregateInputObjectZodSchema = makeSchema();
