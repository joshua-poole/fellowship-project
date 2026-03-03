import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './objects/RowInclude.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';

export const RowDeleteOneSchema: z.ZodType<Prisma.RowDeleteArgs> = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), where: RowWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RowDeleteArgs>;

export const RowDeleteOneZodSchema = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), where: RowWhereUniqueInputObjectSchema }).strict();