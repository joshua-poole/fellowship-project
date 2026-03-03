import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './objects/ColumnSelect.schema';
import { ColumnIncludeObjectSchema as ColumnIncludeObjectSchema } from './objects/ColumnInclude.schema';
import { ColumnCreateInputObjectSchema as ColumnCreateInputObjectSchema } from './objects/ColumnCreateInput.schema';
import { ColumnUncheckedCreateInputObjectSchema as ColumnUncheckedCreateInputObjectSchema } from './objects/ColumnUncheckedCreateInput.schema';

export const ColumnCreateOneSchema: z.ZodType<Prisma.ColumnCreateArgs> = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), data: z.union([ColumnCreateInputObjectSchema, ColumnUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ColumnCreateArgs>;

export const ColumnCreateOneZodSchema = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), data: z.union([ColumnCreateInputObjectSchema, ColumnUncheckedCreateInputObjectSchema]) }).strict();