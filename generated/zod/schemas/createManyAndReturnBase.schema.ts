import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseCreateManyInputObjectSchema as BaseCreateManyInputObjectSchema } from './objects/BaseCreateManyInput.schema';

export const BaseCreateManyAndReturnSchema: z.ZodType<Prisma.BaseCreateManyAndReturnArgs> = z.object({ select: BaseSelectObjectSchema.optional(), data: z.union([ BaseCreateManyInputObjectSchema, z.array(BaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BaseCreateManyAndReturnArgs>;

export const BaseCreateManyAndReturnZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), data: z.union([ BaseCreateManyInputObjectSchema, z.array(BaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();