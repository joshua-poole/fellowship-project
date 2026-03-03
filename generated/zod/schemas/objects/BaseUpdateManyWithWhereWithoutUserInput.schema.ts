import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseScalarWhereInputObjectSchema as BaseScalarWhereInputObjectSchema } from './BaseScalarWhereInput.schema';
import { BaseUpdateManyMutationInputObjectSchema as BaseUpdateManyMutationInputObjectSchema } from './BaseUpdateManyMutationInput.schema';
import { BaseUncheckedUpdateManyWithoutUserInputObjectSchema as BaseUncheckedUpdateManyWithoutUserInputObjectSchema } from './BaseUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => BaseUpdateManyMutationInputObjectSchema), z.lazy(() => BaseUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const BaseUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateManyWithWhereWithoutUserInput>;
export const BaseUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
