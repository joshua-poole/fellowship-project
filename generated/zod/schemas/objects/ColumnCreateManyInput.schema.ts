import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  type: ColumnTypeSchema,
  order: z.number().int(),
  description: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tableId: z.string()
}).strict();
export const ColumnCreateManyInputObjectSchema: z.ZodType<Prisma.ColumnCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnCreateManyInput>;
export const ColumnCreateManyInputObjectZodSchema = makeSchema();
