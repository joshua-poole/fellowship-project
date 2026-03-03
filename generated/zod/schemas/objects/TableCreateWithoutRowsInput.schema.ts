import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { UserCreateNestedOneWithoutTablesInputObjectSchema as UserCreateNestedOneWithoutTablesInputObjectSchema } from './UserCreateNestedOneWithoutTablesInput.schema';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutTablesInputObjectSchema),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutRowsInput>;
export const TableCreateWithoutRowsInputObjectZodSchema = makeSchema();
