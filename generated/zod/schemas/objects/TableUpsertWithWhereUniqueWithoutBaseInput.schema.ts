import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateWithoutBaseInputObjectSchema as TableUpdateWithoutBaseInputObjectSchema } from './TableUpdateWithoutBaseInput.schema';
import { TableUncheckedUpdateWithoutBaseInputObjectSchema as TableUncheckedUpdateWithoutBaseInputObjectSchema } from './TableUncheckedUpdateWithoutBaseInput.schema';
import { TableCreateWithoutBaseInputObjectSchema as TableCreateWithoutBaseInputObjectSchema } from './TableCreateWithoutBaseInput.schema';
import { TableUncheckedCreateWithoutBaseInputObjectSchema as TableUncheckedCreateWithoutBaseInputObjectSchema } from './TableUncheckedCreateWithoutBaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TableUpdateWithoutBaseInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutBaseInputObjectSchema)]),
  create: z.union([z.lazy(() => TableCreateWithoutBaseInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutBaseInputObjectSchema)])
}).strict();
export const TableUpsertWithWhereUniqueWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableUpsertWithWhereUniqueWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpsertWithWhereUniqueWithoutBaseInput>;
export const TableUpsertWithWhereUniqueWithoutBaseInputObjectZodSchema = makeSchema();
