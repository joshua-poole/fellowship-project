import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BaseScalarRelationFilterObjectSchema as BaseScalarRelationFilterObjectSchema } from './BaseScalarRelationFilter.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './BaseWhereInput.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ColumnListRelationFilterObjectSchema as ColumnListRelationFilterObjectSchema } from './ColumnListRelationFilter.schema';
import { RowListRelationFilterObjectSchema as RowListRelationFilterObjectSchema } from './RowListRelationFilter.schema'

const tablewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => TableWhereInputObjectSchema), z.lazy(() => TableWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => TableWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => TableWhereInputObjectSchema), z.lazy(() => TableWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  baseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  base: z.union([z.lazy(() => BaseScalarRelationFilterObjectSchema), z.lazy(() => BaseWhereInputObjectSchema)]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  columns: z.lazy(() => ColumnListRelationFilterObjectSchema).optional(),
  rows: z.lazy(() => RowListRelationFilterObjectSchema).optional()
}).strict();
export const TableWhereInputObjectSchema: z.ZodType<Prisma.TableWhereInput> = tablewhereinputSchema as unknown as z.ZodType<Prisma.TableWhereInput>;
export const TableWhereInputObjectZodSchema = tablewhereinputSchema;
