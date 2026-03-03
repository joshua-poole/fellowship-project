import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableCreateWithoutRowsInputObjectSchema as TableCreateWithoutRowsInputObjectSchema } from './TableCreateWithoutRowsInput.schema';
import { TableUncheckedCreateWithoutRowsInputObjectSchema as TableUncheckedCreateWithoutRowsInputObjectSchema } from './TableUncheckedCreateWithoutRowsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TableCreateWithoutRowsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutRowsInputObjectSchema)])
}).strict();
export const TableCreateOrConnectWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableCreateOrConnectWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateOrConnectWithoutRowsInput>;
export const TableCreateOrConnectWithoutRowsInputObjectZodSchema = makeSchema();
