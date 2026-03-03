import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseCreateWithoutUserInputObjectSchema as BaseCreateWithoutUserInputObjectSchema } from './BaseCreateWithoutUserInput.schema';
import { BaseUncheckedCreateWithoutUserInputObjectSchema as BaseUncheckedCreateWithoutUserInputObjectSchema } from './BaseUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BaseCreateWithoutUserInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const BaseCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateOrConnectWithoutUserInput>;
export const BaseCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
