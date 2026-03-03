import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateNestedOneWithoutTablesInputObjectSchema as UserCreateNestedOneWithoutTablesInputObjectSchema } from './UserCreateNestedOneWithoutTablesInput.schema';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema';
import { RowCreateNestedManyWithoutTableInputObjectSchema as RowCreateNestedManyWithoutTableInputObjectSchema } from './RowCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTablesInputObjectSchema),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional(),
  rows: z.lazy(() => RowCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutBaseInput>;
export const TableCreateWithoutBaseInputObjectZodSchema = makeSchema();
