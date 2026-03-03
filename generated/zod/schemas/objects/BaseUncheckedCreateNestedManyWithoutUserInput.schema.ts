import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateWithoutUserInputObjectSchema as BaseCreateWithoutUserInputObjectSchema } from './BaseCreateWithoutUserInput.schema';
import { BaseUncheckedCreateWithoutUserInputObjectSchema as BaseUncheckedCreateWithoutUserInputObjectSchema } from './BaseUncheckedCreateWithoutUserInput.schema';
import { BaseCreateOrConnectWithoutUserInputObjectSchema as BaseCreateOrConnectWithoutUserInputObjectSchema } from './BaseCreateOrConnectWithoutUserInput.schema';
import { BaseCreateManyUserInputEnvelopeObjectSchema as BaseCreateManyUserInputEnvelopeObjectSchema } from './BaseCreateManyUserInputEnvelope.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BaseCreateWithoutUserInputObjectSchema), z.lazy(() => BaseCreateWithoutUserInputObjectSchema).array(), z.lazy(() => BaseUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BaseCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => BaseCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BaseCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => BaseWhereUniqueInputObjectSchema), z.lazy(() => BaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedCreateNestedManyWithoutUserInput>;
export const BaseUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
