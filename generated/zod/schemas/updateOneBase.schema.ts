import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './objects/BaseInclude.schema';
import { BaseUpdateInputObjectSchema as BaseUpdateInputObjectSchema } from './objects/BaseUpdateInput.schema';
import { BaseUncheckedUpdateInputObjectSchema as BaseUncheckedUpdateInputObjectSchema } from './objects/BaseUncheckedUpdateInput.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';

export const BaseUpdateOneSchema: z.ZodType<Prisma.BaseUpdateArgs> = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), data: z.union([BaseUpdateInputObjectSchema, BaseUncheckedUpdateInputObjectSchema]), where: BaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BaseUpdateArgs>;

export const BaseUpdateOneZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), data: z.union([BaseUpdateInputObjectSchema, BaseUncheckedUpdateInputObjectSchema]), where: BaseWhereUniqueInputObjectSchema }).strict();