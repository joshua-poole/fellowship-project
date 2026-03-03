import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutColumnsInputObjectSchema as TableCreateWithoutColumnsInputObjectSchema } from './TableCreateWithoutColumnsInput.schema';
import { TableUncheckedCreateWithoutColumnsInputObjectSchema as TableUncheckedCreateWithoutColumnsInputObjectSchema } from './TableUncheckedCreateWithoutColumnsInput.schema';
import { TableCreateOrConnectWithoutColumnsInputObjectSchema as TableCreateOrConnectWithoutColumnsInputObjectSchema } from './TableCreateOrConnectWithoutColumnsInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutColumnsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutColumnsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => TableCreateOrConnectWithoutColumnsInputObjectSchema).optional(),
  connect: z.lazy(() => TableWhereUniqueInputObjectSchema).optional()
}).strict();
export const TableCreateNestedOneWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableCreateNestedOneWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateNestedOneWithoutColumnsInput>;
export const TableCreateNestedOneWithoutColumnsInputObjectZodSchema = makeSchema();
