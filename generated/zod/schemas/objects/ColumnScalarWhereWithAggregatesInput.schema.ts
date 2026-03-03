import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumColumnTypeWithAggregatesFilterObjectSchema as EnumColumnTypeWithAggregatesFilterObjectSchema } from './EnumColumnTypeWithAggregatesFilter.schema';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const columnscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ColumnScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumColumnTypeWithAggregatesFilterObjectSchema), ColumnTypeSchema]).optional(),
  order: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  defaultValue: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  tableId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const ColumnScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput> = columnscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput>;
export const ColumnScalarWhereWithAggregatesInputObjectZodSchema = columnscalarwherewithaggregatesinputSchema;
