import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './objects/ColumnSelect.schema';
import { ColumnCreateManyInputObjectSchema as ColumnCreateManyInputObjectSchema } from './objects/ColumnCreateManyInput.schema';

export const ColumnCreateManyAndReturnSchema: z.ZodType<Prisma.ColumnCreateManyAndReturnArgs> = z.object({ select: ColumnSelectObjectSchema.optional(), data: z.union([ ColumnCreateManyInputObjectSchema, z.array(ColumnCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ColumnCreateManyAndReturnArgs>;

export const ColumnCreateManyAndReturnZodSchema = z.object({ select: ColumnSelectObjectSchema.optional(), data: z.union([ ColumnCreateManyInputObjectSchema, z.array(ColumnCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();