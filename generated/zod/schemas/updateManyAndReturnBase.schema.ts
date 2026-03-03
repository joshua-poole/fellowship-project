import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseUpdateManyMutationInputObjectSchema as BaseUpdateManyMutationInputObjectSchema } from './objects/BaseUpdateManyMutationInput.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';

export const BaseUpdateManyAndReturnSchema: z.ZodType<Prisma.BaseUpdateManyAndReturnArgs> = z.object({ select: BaseSelectObjectSchema.optional(), data: BaseUpdateManyMutationInputObjectSchema, where: BaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BaseUpdateManyAndReturnArgs>;

export const BaseUpdateManyAndReturnZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), data: BaseUpdateManyMutationInputObjectSchema, where: BaseWhereInputObjectSchema.optional() }).strict();