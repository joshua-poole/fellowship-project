import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutUserInputObjectSchema as TableCreateWithoutUserInputObjectSchema } from './TableCreateWithoutUserInput.schema';
import { TableUncheckedCreateWithoutUserInputObjectSchema as TableUncheckedCreateWithoutUserInputObjectSchema } from './TableUncheckedCreateWithoutUserInput.schema';
import { TableCreateOrConnectWithoutUserInputObjectSchema as TableCreateOrConnectWithoutUserInputObjectSchema } from './TableCreateOrConnectWithoutUserInput.schema';
import { TableUpsertWithWhereUniqueWithoutUserInputObjectSchema as TableUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './TableUpsertWithWhereUniqueWithoutUserInput.schema';
import { TableCreateManyUserInputEnvelopeObjectSchema as TableCreateManyUserInputEnvelopeObjectSchema } from './TableCreateManyUserInputEnvelope.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateWithWhereUniqueWithoutUserInputObjectSchema as TableUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './TableUpdateWithWhereUniqueWithoutUserInput.schema';
import { TableUpdateManyWithWhereWithoutUserInputObjectSchema as TableUpdateManyWithWhereWithoutUserInputObjectSchema } from './TableUpdateManyWithWhereWithoutUserInput.schema';
import { TableScalarWhereInputObjectSchema as TableScalarWhereInputObjectSchema } from './TableScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutUserInputObjectSchema), z.lazy(() => TableCreateWithoutUserInputObjectSchema).array(), z.lazy(() => TableUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TableCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => TableCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TableUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => TableUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TableCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TableUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => TableUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TableUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => TableUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TableScalarWhereInputObjectSchema), z.lazy(() => TableScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TableUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.TableUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateManyWithoutUserNestedInput>;
export const TableUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
