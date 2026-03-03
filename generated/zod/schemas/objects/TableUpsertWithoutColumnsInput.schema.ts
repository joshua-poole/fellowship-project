import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableUpdateWithoutColumnsInputObjectSchema as TableUpdateWithoutColumnsInputObjectSchema } from './TableUpdateWithoutColumnsInput.schema';
import { TableUncheckedUpdateWithoutColumnsInputObjectSchema as TableUncheckedUpdateWithoutColumnsInputObjectSchema } from './TableUncheckedUpdateWithoutColumnsInput.schema';
import { TableCreateWithoutColumnsInputObjectSchema as TableCreateWithoutColumnsInputObjectSchema } from './TableCreateWithoutColumnsInput.schema';
import { TableUncheckedCreateWithoutColumnsInputObjectSchema as TableUncheckedCreateWithoutColumnsInputObjectSchema } from './TableUncheckedCreateWithoutColumnsInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => TableUpdateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutColumnsInputObjectSchema)]),
  create: z.union([z.lazy(() => TableCreateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutColumnsInputObjectSchema)]),
  where: z.lazy(() => TableWhereInputObjectSchema).optional()
}).strict();
export const TableUpsertWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUpsertWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpsertWithoutColumnsInput>;
export const TableUpsertWithoutColumnsInputObjectZodSchema = makeSchema();
