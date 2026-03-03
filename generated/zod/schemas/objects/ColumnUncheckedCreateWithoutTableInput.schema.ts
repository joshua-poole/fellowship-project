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
  updatedAt: z.coerce.date().optional()
}).strict();
export const ColumnUncheckedCreateWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUncheckedCreateWithoutTableInput>;
export const ColumnUncheckedCreateWithoutTableInputObjectZodSchema = makeSchema();
