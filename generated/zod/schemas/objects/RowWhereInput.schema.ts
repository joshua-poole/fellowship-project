import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { TableScalarRelationFilterObjectSchema as TableScalarRelationFilterObjectSchema } from './TableScalarRelationFilter.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const rowwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RowWhereInputObjectSchema), z.lazy(() => RowWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RowWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RowWhereInputObjectSchema), z.lazy(() => RowWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  tableId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  values: z.lazy(() => JsonFilterObjectSchema).optional(),
  table: z.union([z.lazy(() => TableScalarRelationFilterObjectSchema), z.lazy(() => TableWhereInputObjectSchema)]).optional()
}).strict();
export const RowWhereInputObjectSchema: z.ZodType<Prisma.RowWhereInput> = rowwhereinputSchema as unknown as z.ZodType<Prisma.RowWhereInput>;
export const RowWhereInputObjectZodSchema = rowwhereinputSchema;
