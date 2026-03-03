import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { NestedEnumColumnTypeFilterObjectSchema as NestedEnumColumnTypeFilterObjectSchema } from './NestedEnumColumnTypeFilter.schema'

const makeSchema = () => z.object({
  equals: ColumnTypeSchema.optional(),
  in: ColumnTypeSchema.array().optional(),
  notIn: ColumnTypeSchema.array().optional(),
  not: z.union([ColumnTypeSchema, z.lazy(() => NestedEnumColumnTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumColumnTypeFilterObjectSchema: z.ZodType<Prisma.EnumColumnTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumColumnTypeFilter>;
export const EnumColumnTypeFilterObjectZodSchema = makeSchema();
