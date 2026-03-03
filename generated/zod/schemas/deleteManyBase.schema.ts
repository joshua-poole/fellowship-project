import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';

export const BaseDeleteManySchema: z.ZodType<Prisma.BaseDeleteManyArgs> = z.object({ where: BaseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BaseDeleteManyArgs>;

export const BaseDeleteManyZodSchema = z.object({ where: BaseWhereInputObjectSchema.optional() }).strict();