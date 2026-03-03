import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema';
import { RowCreateNestedManyWithoutTableInputObjectSchema as RowCreateNestedManyWithoutTableInputObjectSchema } from './RowCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional(),
  rows: z.lazy(() => RowCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutUserInput>;
export const TableCreateWithoutUserInputObjectZodSchema = makeSchema();
