import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateWithoutUserInputObjectSchema as BaseUpdateWithoutUserInputObjectSchema } from './BaseUpdateWithoutUserInput.schema';
import { BaseUncheckedUpdateWithoutUserInputObjectSchema as BaseUncheckedUpdateWithoutUserInputObjectSchema } from './BaseUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => BaseUpdateWithoutUserInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const BaseUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateWithWhereUniqueWithoutUserInput>;
export const BaseUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
