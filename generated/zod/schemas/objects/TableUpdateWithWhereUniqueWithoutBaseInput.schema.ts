import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateWithoutBaseInputObjectSchema as TableUpdateWithoutBaseInputObjectSchema } from './TableUpdateWithoutBaseInput.schema';
import { TableUncheckedUpdateWithoutBaseInputObjectSchema as TableUncheckedUpdateWithoutBaseInputObjectSchema } from './TableUncheckedUpdateWithoutBaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => TableUpdateWithoutBaseInputObjectSchema), z.lazy(() => TableUncheckedUpdateWithoutBaseInputObjectSchema)])
}).strict();
export const TableUpdateWithWhereUniqueWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableUpdateWithWhereUniqueWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateWithWhereUniqueWithoutBaseInput>;
export const TableUpdateWithWhereUniqueWithoutBaseInputObjectZodSchema = makeSchema();
