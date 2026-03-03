import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableUpdateWithoutRowsInputObjectSchema as TableUpdateWithoutRowsInputObjectSchema } from './TableUpdateWithoutRowsInput.schema';
import { TableUncheckedUpdateWithoutRowsInputObjectSchema as TableUncheckedUpdateWithoutRowsInputObjectSchema } from './TableUncheckedUpdateWithoutRowsInput.schema';
import { TableCreateWithoutRowsInputObjectSchema as TableCreateWithoutRowsInputObjectSchema } from './TableCreateWithoutRowsInput.schema';
import { TableUncheckedCreateWithoutRowsInputObjectSchema as TableUncheckedCreateWithoutRowsInputObjectSchema } from './TableUncheckedCreateWithoutRowsInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => TableUpdateWithoutRowsInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutRowsInputObjectSchema)]),
  create: z.union([z.lazy(() => TableCreateWithoutRowsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutRowsInputObjectSchema)]),
  where: z.lazy(() => TableWhereInputObjectSchema).optional()
}).strict();
export const TableUpsertWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableUpsertWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpsertWithoutRowsInput>;
export const TableUpsertWithoutRowsInputObjectZodSchema = makeSchema();
