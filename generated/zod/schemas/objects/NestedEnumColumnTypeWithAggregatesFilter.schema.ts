import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumColumnTypeFilterObjectSchema as NestedEnumColumnTypeFilterObjectSchema } from './NestedEnumColumnTypeFilter.schema'

const nestedenumcolumntypewithaggregatesfilterSchema = z.object({
  equals: ColumnTypeSchema.optional(),
  in: ColumnTypeSchema.array().optional(),
  notIn: ColumnTypeSchema.array().optional(),
  not: z.union([ColumnTypeSchema, z.lazy(() => NestedEnumColumnTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumColumnTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumColumnTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumColumnTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumColumnTypeWithAggregatesFilter> = nestedenumcolumntypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumColumnTypeWithAggregatesFilter>;
export const NestedEnumColumnTypeWithAggregatesFilterObjectZodSchema = nestedenumcolumntypewithaggregatesfilterSchema;
