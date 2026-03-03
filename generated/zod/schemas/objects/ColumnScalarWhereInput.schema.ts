import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumColumnTypeFilterObjectSchema as EnumColumnTypeFilterObjectSchema } from './EnumColumnTypeFilter.schema';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const columnscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ColumnScalarWhereInputObjectSchema), z.lazy(() => ColumnScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ColumnScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ColumnScalarWhereInputObjectSchema), z.lazy(() => ColumnScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumColumnTypeFilterObjectSchema), ColumnTypeSchema]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  default: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  tableId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const ColumnScalarWhereInputObjectSchema: z.ZodType<Prisma.ColumnScalarWhereInput> = columnscalarwhereinputSchema as unknown as z.ZodType<Prisma.ColumnScalarWhereInput>;
export const ColumnScalarWhereInputObjectZodSchema = columnscalarwhereinputSchema;
