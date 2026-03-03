import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseUpdateManyMutationInputObjectSchema as BaseUpdateManyMutationInputObjectSchema } from './objects/BaseUpdateManyMutationInput.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';

export const BaseUpdateManySchema: z.ZodType<Prisma.BaseUpdateManyArgs> = z.object({ data: BaseUpdateManyMutationInputObjectSchema, where: BaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BaseUpdateManyArgs>;

export const BaseUpdateManyZodSchema = z.object({ data: BaseUpdateManyMutationInputObjectSchema, where: BaseWhereInputObjectSchema.optional() }).strict();