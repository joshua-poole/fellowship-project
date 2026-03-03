import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutColumnsInputObjectSchema as TableCreateWithoutColumnsInputObjectSchema } from './TableCreateWithoutColumnsInput.schema';
import { TableUncheckedCreateWithoutColumnsInputObjectSchema as TableUncheckedCreateWithoutColumnsInputObjectSchema } from './TableUncheckedCreateWithoutColumnsInput.schema';
import { TableCreateOrConnectWithoutColumnsInputObjectSchema as TableCreateOrConnectWithoutColumnsInputObjectSchema } from './TableCreateOrConnectWithoutColumnsInput.schema';
import { TableUpsertWithoutColumnsInputObjectSchema as TableUpsertWithoutColumnsInputObjectSchema } from './TableUpsertWithoutColumnsInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateToOneWithWhereWithoutColumnsInputObjectSchema as TableUpdateToOneWithWhereWithoutColumnsInputObjectSchema } from './TableUpdateToOneWithWhereWithoutColumnsInput.schema';
import { TableUpdateWithoutColumnsInputObjectSchema as TableUpdateWithoutColumnsInputObjectSchema } from './TableUpdateWithoutColumnsInput.schema';
import { TableUncheckedUpdateWithoutColumnsInputObjectSchema as TableUncheckedUpdateWithoutColumnsInputObjectSchema } from './TableUncheckedUpdateWithoutColumnsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutColumnsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => TableCreateOrConnectWithoutColumnsInputObjectSchema).optional(),
  upsert: z.lazy(() => TableUpsertWithoutColumnsInputObjectSchema).optional(),
  connect: z.lazy(() => TableWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => TableUpdateToOneWithWhereWithoutColumnsInputObjectSchema), z.lazy(() => TableUpdateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutColumnsInputObjectSchema)]).optional()
}).strict();
export const TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema: z.ZodType<Prisma.TableUpdateOneRequiredWithoutColumnsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateOneRequiredWithoutColumnsNestedInput>;
export const TableUpdateOneRequiredWithoutColumnsNestedInputObjectZodSchema = makeSchema();
