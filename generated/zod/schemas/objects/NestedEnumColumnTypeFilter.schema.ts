import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema'

const nestedenumcolumntypefilterSchema = z.object({
  equals: ColumnTypeSchema.optional(),
  in: ColumnTypeSchema.array().optional(),
  notIn: ColumnTypeSchema.array().optional(),
  not: z.union([ColumnTypeSchema, z.lazy(() => NestedEnumColumnTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumColumnTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumColumnTypeFilter> = nestedenumcolumntypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumColumnTypeFilter>;
export const NestedEnumColumnTypeFilterObjectZodSchema = nestedenumcolumntypefilterSchema;
