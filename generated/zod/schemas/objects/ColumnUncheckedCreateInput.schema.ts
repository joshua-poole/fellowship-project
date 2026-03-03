import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  type: ColumnTypeSchema,
  description: z.string().optional().nullable(),
  default: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  tableId: z.string()
}).strict();
export const ColumnUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ColumnUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUncheckedCreateInput>;
export const ColumnUncheckedCreateInputObjectZodSchema = makeSchema();
