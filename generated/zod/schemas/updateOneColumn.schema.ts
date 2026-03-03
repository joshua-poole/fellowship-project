import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './objects/ColumnSelect.schema';
import { ColumnIncludeObjectSchema as ColumnIncludeObjectSchema } from './objects/ColumnInclude.schema';
import { ColumnUpdateInputObjectSchema as ColumnUpdateInputObjectSchema } from './objects/ColumnUpdateInput.schema';
import { ColumnUncheckedUpdateInputObjectSchema as ColumnUncheckedUpdateInputObjectSchema } from './objects/ColumnUncheckedUpdateInput.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './objects/ColumnWhereUniqueInput.schema';

export const ColumnUpdateOneSchema: z.ZodType<Prisma.ColumnUpdateArgs> = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), data: z.union([ColumnUpdateInputObjectSchema, ColumnUncheckedUpdateInputObjectSchema]), where: ColumnWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ColumnUpdateArgs>;

export const ColumnUpdateOneZodSchema = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), data: z.union([ColumnUpdateInputObjectSchema, ColumnUncheckedUpdateInputObjectSchema]), where: ColumnWhereUniqueInputObjectSchema }).strict();