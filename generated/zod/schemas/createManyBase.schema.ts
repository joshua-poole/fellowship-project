import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseCreateManyInputObjectSchema as BaseCreateManyInputObjectSchema } from './objects/BaseCreateManyInput.schema';

export const BaseCreateManySchema: z.ZodType<Prisma.BaseCreateManyArgs> = z.object({ data: z.union([ BaseCreateManyInputObjectSchema, z.array(BaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BaseCreateManyArgs>;

export const BaseCreateManyZodSchema = z.object({ data: z.union([ BaseCreateManyInputObjectSchema, z.array(BaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();