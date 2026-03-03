import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './objects/RowInclude.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';
import { RowCreateInputObjectSchema as RowCreateInputObjectSchema } from './objects/RowCreateInput.schema';
import { RowUncheckedCreateInputObjectSchema as RowUncheckedCreateInputObjectSchema } from './objects/RowUncheckedCreateInput.schema';
import { RowUpdateInputObjectSchema as RowUpdateInputObjectSchema } from './objects/RowUpdateInput.schema';
import { RowUncheckedUpdateInputObjectSchema as RowUncheckedUpdateInputObjectSchema } from './objects/RowUncheckedUpdateInput.schema';

export const RowUpsertOneSchema: z.ZodType<Prisma.RowUpsertArgs> = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), where: RowWhereUniqueInputObjectSchema, create: z.union([ RowCreateInputObjectSchema, RowUncheckedCreateInputObjectSchema ]), update: z.union([ RowUpdateInputObjectSchema, RowUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RowUpsertArgs>;

export const RowUpsertOneZodSchema = z.object({ select: RowSelectObjectSchema.optional(), include: RowIncludeObjectSchema.optional(), where: RowWhereUniqueInputObjectSchema, create: z.union([ RowCreateInputObjectSchema, RowUncheckedCreateInputObjectSchema ]), update: z.union([ RowUpdateInputObjectSchema, RowUncheckedUpdateInputObjectSchema ]) }).strict();