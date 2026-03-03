import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const basescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BaseScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BaseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BaseScalarWhereWithAggregatesInput> = basescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BaseScalarWhereWithAggregatesInput>;
export const BaseScalarWhereWithAggregatesInputObjectZodSchema = basescalarwherewithaggregatesinputSchema;
