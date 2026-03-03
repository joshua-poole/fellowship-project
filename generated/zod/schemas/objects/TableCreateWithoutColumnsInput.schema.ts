import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateNestedOneWithoutTablesInputObjectSchema as BaseCreateNestedOneWithoutTablesInputObjectSchema } from './BaseCreateNestedOneWithoutTablesInput.schema';
import { RowCreateNestedManyWithoutTableInputObjectSchema as RowCreateNestedManyWithoutTableInputObjectSchema } from './RowCreateNestedManyWithoutTableInput.schema';
import { ViewCreateNestedManyWithoutTableInputObjectSchema as ViewCreateNestedManyWithoutTableInputObjectSchema } from './ViewCreateNestedManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  base: z.lazy(() => BaseCreateNestedOneWithoutTablesInputObjectSchema),
  rows: z.lazy(() => RowCreateNestedManyWithoutTableInputObjectSchema).optional(),
  views: z.lazy(() => ViewCreateNestedManyWithoutTableInputObjectSchema).optional()
}).strict();
export const TableCreateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableCreateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateWithoutColumnsInput>;
export const TableCreateWithoutColumnsInputObjectZodSchema = makeSchema();
