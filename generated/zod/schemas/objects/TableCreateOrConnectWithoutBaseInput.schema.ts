import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableCreateWithoutBaseInputObjectSchema as TableCreateWithoutBaseInputObjectSchema } from './TableCreateWithoutBaseInput.schema';
import { TableUncheckedCreateWithoutBaseInputObjectSchema as TableUncheckedCreateWithoutBaseInputObjectSchema } from './TableUncheckedCreateWithoutBaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TableCreateWithoutBaseInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutBaseInputObjectSchema)])
}).strict();
export const TableCreateOrConnectWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableCreateOrConnectWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateOrConnectWithoutBaseInput>;
export const TableCreateOrConnectWithoutBaseInputObjectZodSchema = makeSchema();
