import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema as ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ColumnUncheckedCreateNestedManyWithoutTableInput.schema';
import { RowUncheckedCreateNestedManyWithoutTableInputObjectSchema as RowUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './RowUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  columns: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional(),
  rows: z.lazy(() => RowUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateWithoutBaseInput>;
export const TableUncheckedCreateWithoutBaseInputObjectZodSchema = makeSchema();
