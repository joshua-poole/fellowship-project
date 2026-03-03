import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './objects/BaseInclude.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';
import { BaseCreateInputObjectSchema as BaseCreateInputObjectSchema } from './objects/BaseCreateInput.schema';
import { BaseUncheckedCreateInputObjectSchema as BaseUncheckedCreateInputObjectSchema } from './objects/BaseUncheckedCreateInput.schema';
import { BaseUpdateInputObjectSchema as BaseUpdateInputObjectSchema } from './objects/BaseUpdateInput.schema';
import { BaseUncheckedUpdateInputObjectSchema as BaseUncheckedUpdateInputObjectSchema } from './objects/BaseUncheckedUpdateInput.schema';

export const BaseUpsertOneSchema: z.ZodType<Prisma.BaseUpsertArgs> = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), where: BaseWhereUniqueInputObjectSchema, create: z.union([ BaseCreateInputObjectSchema, BaseUncheckedCreateInputObjectSchema ]), update: z.union([ BaseUpdateInputObjectSchema, BaseUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.BaseUpsertArgs>;

export const BaseUpsertOneZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), where: BaseWhereUniqueInputObjectSchema, create: z.union([ BaseCreateInputObjectSchema, BaseUncheckedCreateInputObjectSchema ]), update: z.union([ BaseUpdateInputObjectSchema, BaseUncheckedUpdateInputObjectSchema ]) }).strict();