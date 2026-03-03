import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema';
import { TableUpdateWithoutColumnsInputObjectSchema as TableUpdateWithoutColumnsInputObjectSchema } from './TableUpdateWithoutColumnsInput.schema';
import { TableUncheckedUpdateWithoutColumnsInputObjectSchema as TableUncheckedUpdateWithoutColumnsInputObjectSchema } from './TableUncheckedUpdateWithoutColumnsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => TableUpdateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutColumnsInputObjectSchema)])
}).strict();
export const TableUpdateToOneWithWhereWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUpdateToOneWithWhereWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateToOneWithWhereWithoutColumnsInput>;
export const TableUpdateToOneWithWhereWithoutColumnsInputObjectZodSchema = makeSchema();
