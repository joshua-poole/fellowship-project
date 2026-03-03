import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema'

const rowscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RowScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RowScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RowScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RowScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RowScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  tableId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  values: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional()
}).strict();
export const RowScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RowScalarWhereWithAggregatesInput> = rowscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RowScalarWhereWithAggregatesInput>;
export const RowScalarWhereWithAggregatesInputObjectZodSchema = rowscalarwherewithaggregatesinputSchema;
