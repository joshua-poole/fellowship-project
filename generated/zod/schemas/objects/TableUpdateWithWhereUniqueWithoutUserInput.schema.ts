import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateWithoutUserInputObjectSchema as TableUpdateWithoutUserInputObjectSchema } from './TableUpdateWithoutUserInput.schema';
import { TableUncheckedUpdateWithoutUserInputObjectSchema as TableUncheckedUpdateWithoutUserInputObjectSchema } from './TableUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TableUpdateWithoutUserInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const TableUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.TableUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateWithWhereUniqueWithoutUserInput>;
export const TableUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
