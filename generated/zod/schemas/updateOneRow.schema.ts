import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './objects/RowInclude.schema';
import { RowUpdateInputObjectSchema as RowUpdateInputObjectSchema } from './objects/RowUpdateInput.schema';
import { RowUncheckedUpdateInputObjectSchema as RowUncheckedUpdateInputObjectSchema } from './objects/RowUncheckedUpdateInput.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';

export const RowUpdateOneSchema: z.ZodType<Prisma.RowUpdateArgs> = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), data: z.union([RowUpdateInputObjectSchema, RowUncheckedUpdateInputObjectSchema]), where: RowWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RowUpdateArgs>;

export const RowUpdateOneZodSchema = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), data: z.union([RowUpdateInputObjectSchema, RowUncheckedUpdateInputObjectSchema]), where: RowWhereUniqueInputObjectSchema }).strict();