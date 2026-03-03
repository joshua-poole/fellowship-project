import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './objects/ColumnSelect.schema';
import { ColumnIncludeObjectSchema as ColumnIncludeObjectSchema } from './objects/ColumnInclude.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './objects/ColumnWhereUniqueInput.schema';
import { ColumnCreateInputObjectSchema as ColumnCreateInputObjectSchema } from './objects/ColumnCreateInput.schema';
import { ColumnUncheckedCreateInputObjectSchema as ColumnUncheckedCreateInputObjectSchema } from './objects/ColumnUncheckedCreateInput.schema';
import { ColumnUpdateInputObjectSchema as ColumnUpdateInputObjectSchema } from './objects/ColumnUpdateInput.schema';
import { ColumnUncheckedUpdateInputObjectSchema as ColumnUncheckedUpdateInputObjectSchema } from './objects/ColumnUncheckedUpdateInput.schema';

export const ColumnUpsertOneSchema: z.ZodType<Prisma.ColumnUpsertArgs> = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), where: ColumnWhereUniqueInputObjectSchema, create: z.union([ ColumnCreateInputObjectSchema, ColumnUncheckedCreateInputObjectSchema ]), update: z.union([ ColumnUpdateInputObjectSchema, ColumnUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ColumnUpsertArgs>;

export const ColumnUpsertOneZodSchema = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), where: ColumnWhereUniqueInputObjectSchema, create: z.union([ ColumnCreateInputObjectSchema, ColumnUncheckedCreateInputObjectSchema ]), update: z.union([ ColumnUpdateInputObjectSchema, ColumnUncheckedUpdateInputObjectSchema ]) }).strict();