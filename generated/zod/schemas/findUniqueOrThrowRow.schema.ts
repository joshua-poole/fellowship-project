import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './objects/RowInclude.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';

export const RowFindUniqueOrThrowSchema: z.ZodType<Prisma.RowFindUniqueOrThrowArgs> = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), where: RowWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RowFindUniqueOrThrowArgs>;

export const RowFindUniqueOrThrowZodSchema = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), where: RowWhereUniqueInputObjectSchema }).strict();