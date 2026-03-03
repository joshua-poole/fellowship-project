import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema';
import { TableUpdateWithoutRowsInputObjectSchema as TableUpdateWithoutRowsInputObjectSchema } from './TableUpdateWithoutRowsInput.schema';
import { TableUncheckedUpdateWithoutRowsInputObjectSchema as TableUncheckedUpdateWithoutRowsInputObjectSchema } from './TableUncheckedUpdateWithoutRowsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => TableUpdateWithoutRowsInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutRowsInputObjectSchema)])
}).strict();
export const TableUpdateToOneWithWhereWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableUpdateToOneWithWhereWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateToOneWithWhereWithoutRowsInput>;
export const TableUpdateToOneWithWhereWithoutRowsInputObjectZodSchema = makeSchema();
