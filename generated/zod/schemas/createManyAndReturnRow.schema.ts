import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowCreateManyInputObjectSchema as RowCreateManyInputObjectSchema } from './objects/RowCreateManyInput.schema';

export const RowCreateManyAndReturnSchema: z.ZodType<Prisma.RowCreateManyAndReturnArgs> = z.object({ select: RowSelectObjectSchema.optional(), data: z.union([ RowCreateManyInputObjectSchema, z.array(RowCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RowCreateManyAndReturnArgs>;

export const RowCreateManyAndReturnZodSchema = z.object({ select: RowSelectObjectSchema.optional(), data: z.union([ RowCreateManyInputObjectSchema, z.array(RowCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();