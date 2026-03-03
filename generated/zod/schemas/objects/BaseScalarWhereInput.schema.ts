import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const basescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BaseScalarWhereInputObjectSchema), z.lazy(() => BaseScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BaseScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BaseScalarWhereInputObjectSchema), z.lazy(() => BaseScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BaseScalarWhereInputObjectSchema: z.ZodType<Prisma.BaseScalarWhereInput> = basescalarwhereinputSchema as unknown as z.ZodType<Prisma.BaseScalarWhereInput>;
export const BaseScalarWhereInputObjectZodSchema = basescalarwhereinputSchema;
