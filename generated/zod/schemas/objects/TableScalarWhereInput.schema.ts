import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const tablescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TableScalarWhereInputObjectSchema), z.lazy(() => TableScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TableScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TableScalarWhereInputObjectSchema), z.lazy(() => TableScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  baseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const TableScalarWhereInputObjectSchema: z.ZodType<Prisma.TableScalarWhereInput> = tablescalarwhereinputSchema as unknown as z.ZodType<Prisma.TableScalarWhereInput>;
export const TableScalarWhereInputObjectZodSchema = tablescalarwhereinputSchema;
