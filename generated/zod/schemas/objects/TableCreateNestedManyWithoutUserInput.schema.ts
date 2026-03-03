import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutUserInputObjectSchema as TableCreateWithoutUserInputObjectSchema } from './TableCreateWithoutUserInput.schema';
import { TableUncheckedCreateWithoutUserInputObjectSchema as TableUncheckedCreateWithoutUserInputObjectSchema } from './TableUncheckedCreateWithoutUserInput.schema';
import { TableCreateOrConnectWithoutUserInputObjectSchema as TableCreateOrConnectWithoutUserInputObjectSchema } from './TableCreateOrConnectWithoutUserInput.schema';
import { TableCreateManyUserInputEnvelopeObjectSchema as TableCreateManyUserInputEnvelopeObjectSchema } from './TableCreateManyUserInputEnvelope.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutUserInputObjectSchema), z.lazy(() => TableCreateWithoutUserInputObjectSchema).array(), z.lazy(() => TableUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TableCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => TableCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TableCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TableCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.TableCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateNestedManyWithoutUserInput>;
export const TableCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
