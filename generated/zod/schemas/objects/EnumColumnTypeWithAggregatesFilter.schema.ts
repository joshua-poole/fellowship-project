import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { NestedEnumColumnTypeWithAggregatesFilterObjectSchema as NestedEnumColumnTypeWithAggregatesFilterObjectSchema } from './NestedEnumColumnTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumColumnTypeFilterObjectSchema as NestedEnumColumnTypeFilterObjectSchema } from './NestedEnumColumnTypeFilter.schema'

const makeSchema = () => z.object({
  equals: ColumnTypeSchema.optional(),
  in: ColumnTypeSchema.array().optional(),
  notIn: ColumnTypeSchema.array().optional(),
  not: z.union([ColumnTypeSchema, z.lazy(() => NestedEnumColumnTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumColumnTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumColumnTypeFilterObjectSchema).optional()
}).strict();
export const EnumColumnTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumColumnTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumColumnTypeWithAggregatesFilter>;
export const EnumColumnTypeWithAggregatesFilterObjectZodSchema = makeSchema();
