import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateWithoutUserInputObjectSchema as BaseCreateWithoutUserInputObjectSchema } from './BaseCreateWithoutUserInput.schema';
import { BaseUncheckedCreateWithoutUserInputObjectSchema as BaseUncheckedCreateWithoutUserInputObjectSchema } from './BaseUncheckedCreateWithoutUserInput.schema';
import { BaseCreateOrConnectWithoutUserInputObjectSchema as BaseCreateOrConnectWithoutUserInputObjectSchema } from './BaseCreateOrConnectWithoutUserInput.schema';
import { BaseUpsertWithWhereUniqueWithoutUserInputObjectSchema as BaseUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './BaseUpsertWithWhereUniqueWithoutUserInput.schema';
import { BaseCreateManyUserInputEnvelopeObjectSchema as BaseCreateManyUserInputEnvelopeObjectSchema } from './BaseCreateManyUserInputEnvelope.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateWithWhereUniqueWithoutUserInputObjectSchema as BaseUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './BaseUpdateWithWhereUniqueWithoutUserInput.schema';
import { BaseUpdateManyWithWhereWithoutUserInputObjectSchema as BaseUpdateManyWithWhereWithoutUserInputObjectSchema } from './BaseUpdateManyWithWhereWithoutUserInput.schema';
import { BaseScalarWhereInputObjectSchema as BaseScalarWhereInputObjectSchema } from './BaseScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BaseCreateWithoutUserInputObjectSchema), z.lazy(() => BaseCreateWithoutUserInputObjectSchema).array(), z.lazy(() => BaseUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BaseCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => BaseCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BaseUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => BaseUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BaseCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => BaseUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => BaseUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BaseUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => BaseUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BaseScalarWhereInputObjectSchema), z.lazy(() => BaseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const BaseUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.BaseUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedUpdateManyWithoutUserNestedInput>;
export const BaseUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
