import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const tablescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => TableScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TableScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TableScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TableScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => TableScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  baseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const TableScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.TableScalarWhereWithAggregatesInput> = tablescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.TableScalarWhereWithAggregatesInput>;
export const TableScalarWhereWithAggregatesInputObjectZodSchema = tablescalarwherewithaggregatesinputSchema;
