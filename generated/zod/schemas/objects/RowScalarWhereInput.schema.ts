import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema'

const rowscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RowScalarWhereInputObjectSchema), z.lazy(() => RowScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RowScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RowScalarWhereInputObjectSchema), z.lazy(() => RowScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  tableId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  values: z.lazy(() => JsonFilterObjectSchema).optional()
}).strict();
export const RowScalarWhereInputObjectSchema: z.ZodType<Prisma.RowScalarWhereInput> = rowscalarwhereinputSchema as unknown as z.ZodType<Prisma.RowScalarWhereInput>;
export const RowScalarWhereInputObjectZodSchema = rowscalarwhereinputSchema;
