import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableCreateWithoutColumnsInputObjectSchema as TableCreateWithoutColumnsInputObjectSchema } from './TableCreateWithoutColumnsInput.schema';
import { TableUncheckedCreateWithoutColumnsInputObjectSchema as TableUncheckedCreateWithoutColumnsInputObjectSchema } from './TableUncheckedCreateWithoutColumnsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TableCreateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutColumnsInputObjectSchema)])
}).strict();
export const TableCreateOrConnectWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableCreateOrConnectWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateOrConnectWithoutColumnsInput>;
export const TableCreateOrConnectWithoutColumnsInputObjectZodSchema = makeSchema();
