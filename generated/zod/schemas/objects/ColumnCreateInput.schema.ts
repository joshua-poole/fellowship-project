import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { TableCreateNestedOneWithoutColumnsInputObjectSchema as TableCreateNestedOneWithoutColumnsInputObjectSchema } from './TableCreateNestedOneWithoutColumnsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  type: ColumnTypeSchema,
  order: z.number().int(),
  description: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  table: z.lazy(() => TableCreateNestedOneWithoutColumnsInputObjectSchema)
}).strict();
export const ColumnCreateInputObjectSchema: z.ZodType<Prisma.ColumnCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnCreateInput>;
export const ColumnCreateInputObjectZodSchema = makeSchema();
