import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableCreateWithoutUserInputObjectSchema as TableCreateWithoutUserInputObjectSchema } from './TableCreateWithoutUserInput.schema';
import { TableUncheckedCreateWithoutUserInputObjectSchema as TableUncheckedCreateWithoutUserInputObjectSchema } from './TableUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => TableCreateWithoutUserInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const TableCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.TableCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateOrConnectWithoutUserInput>;
export const TableCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
