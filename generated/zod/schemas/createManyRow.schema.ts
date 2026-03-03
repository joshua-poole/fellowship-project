import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowCreateManyInputObjectSchema as RowCreateManyInputObjectSchema } from './objects/RowCreateManyInput.schema';

export const RowCreateManySchema: z.ZodType<Prisma.RowCreateManyArgs> = z.object({ data: z.union([ RowCreateManyInputObjectSchema, z.array(RowCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RowCreateManyArgs>;

export const RowCreateManyZodSchema = z.object({ data: z.union([ RowCreateManyInputObjectSchema, z.array(RowCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();