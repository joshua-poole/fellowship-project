import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnCreateManyInputObjectSchema as ColumnCreateManyInputObjectSchema } from './objects/ColumnCreateManyInput.schema';

export const ColumnCreateManySchema: z.ZodType<Prisma.ColumnCreateManyArgs> = z.object({ data: z.union([ ColumnCreateManyInputObjectSchema, z.array(ColumnCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ColumnCreateManyArgs>;

export const ColumnCreateManyZodSchema = z.object({ data: z.union([ ColumnCreateManyInputObjectSchema, z.array(ColumnCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();