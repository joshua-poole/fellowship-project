import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumColumnTypeFilterObjectSchema as EnumColumnTypeFilterObjectSchema } from './EnumColumnTypeFilter.schema';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { TableScalarRelationFilterObjectSchema as TableScalarRelationFilterObjectSchema } from './TableScalarRelationFilter.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const columnwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ColumnWhereInputObjectSchema), z.lazy(() => ColumnWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ColumnWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ColumnWhereInputObjectSchema), z.lazy(() => ColumnWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumColumnTypeFilterObjectSchema), ColumnTypeSchema]).optional(),
  order: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  defaultValue: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  tableId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  table: z.union([z.lazy(() => TableScalarRelationFilterObjectSchema), z.lazy(() => TableWhereInputObjectSchema)]).optional()
}).strict();
export const ColumnWhereInputObjectSchema: z.ZodType<Prisma.ColumnWhereInput> = columnwhereinputSchema as unknown as z.ZodType<Prisma.ColumnWhereInput>;
export const ColumnWhereInputObjectZodSchema = columnwhereinputSchema;
