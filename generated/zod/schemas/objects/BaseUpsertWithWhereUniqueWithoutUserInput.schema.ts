import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateWithoutUserInputObjectSchema as BaseUpdateWithoutUserInputObjectSchema } from './BaseUpdateWithoutUserInput.schema';
import { BaseUncheckedUpdateWithoutUserInputObjectSchema as BaseUncheckedUpdateWithoutUserInputObjectSchema } from './BaseUncheckedUpdateWithoutUserInput.schema';
import { BaseCreateWithoutUserInputObjectSchema as BaseCreateWithoutUserInputObjectSchema } from './BaseCreateWithoutUserInput.schema';
import { BaseUncheckedCreateWithoutUserInputObjectSchema as BaseUncheckedCreateWithoutUserInputObjectSchema } from './BaseUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => BaseUpdateWithoutUserInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => BaseCreateWithoutUserInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const BaseUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpsertWithWhereUniqueWithoutUserInput>;
export const BaseUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
