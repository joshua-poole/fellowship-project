import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema as ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ColumnUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  columns: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateWithoutRowsInput>;
export const TableUncheckedCreateWithoutRowsInputObjectZodSchema = makeSchema();
