import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema as ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ColumnUncheckedCreateNestedManyWithoutTableInput.schema';
import { RowUncheckedCreateNestedManyWithoutTableInputObjectSchema as RowUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './RowUncheckedCreateNestedManyWithoutTableInput.schema';
import { ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema as ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema } from './ViewUncheckedCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  columns: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional(),
  rows: z.lazy(() => RowUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional(),
  views: z.lazy(() => ViewUncheckedCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableUncheckedCreateInputObjectSchema: z.ZodType<Prisma.TableUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedCreateInput>;
export const TableUncheckedCreateInputObjectZodSchema = makeSchema();
