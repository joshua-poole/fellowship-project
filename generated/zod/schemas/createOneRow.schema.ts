import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './objects/RowInclude.schema';
import { RowCreateInputObjectSchema as RowCreateInputObjectSchema } from './objects/RowCreateInput.schema';
import { RowUncheckedCreateInputObjectSchema as RowUncheckedCreateInputObjectSchema } from './objects/RowUncheckedCreateInput.schema';

export const RowCreateOneSchema: z.ZodType<Prisma.RowCreateArgs> = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), data: z.union([RowCreateInputObjectSchema, RowUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RowCreateArgs>;

export const RowCreateOneZodSchema = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), data: z.union([RowCreateInputObjectSchema, RowUncheckedCreateInputObjectSchema]) }).strict();