import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { ColumnCreateNestedManyWithoutTableInputObjectSchema as ColumnCreateNestedManyWithoutTableInputObjectSchema } from './ColumnCreateNestedManyWithoutTableInput.schema';
import { ViewCreateNestedManyWithoutTableInputObjectSchema as ViewCreateNestedManyWithoutTableInputObjectSchema } from './ViewCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutTableInputObjectSchema).optional(),
  views: z.lazy(() => ViewCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutRowsInput>;
export const TableCreateWithoutRowsInputObjectZodSchema = makeSchema();
