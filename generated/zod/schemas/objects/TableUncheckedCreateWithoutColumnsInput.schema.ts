import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowUncheckedCreateNestedManyWithoutTableInputObjectSchema as RowUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './RowUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  rows: z.lazy(() => RowUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateWithoutColumnsInput>;
export const TableUncheckedCreateWithoutColumnsInputObjectZodSchema = makeSchema();
