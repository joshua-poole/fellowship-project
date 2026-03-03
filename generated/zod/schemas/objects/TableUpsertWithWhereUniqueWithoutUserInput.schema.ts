import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateWithoutUserInputObjectSchema as TableUpdateWithoutUserInputObjectSchema } from './TableUpdateWithoutUserInput.schema';
import { TableUncheckedUpdateWithoutUserInputObjectSchema as TableUncheckedUpdateWithoutUserInputObjectSchema } from './TableUncheckedUpdateWithoutUserInput.schema';
import { TableCreateWithoutUserInputObjectSchema as TableCreateWithoutUserInputObjectSchema } from './TableCreateWithoutUserInput.schema';
import { TableUncheckedCreateWithoutUserInputObjectSchema as TableUncheckedCreateWithoutUserInputObjectSchema } from './TableUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => TableUpdateWithoutUserInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => TableCreateWithoutUserInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const TableUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.TableUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpsertWithWhereUniqueWithoutUserInput>;
export const TableUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
