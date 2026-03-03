import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './objects/BaseInclude.schema';
import { BaseCreateInputObjectSchema as BaseCreateInputObjectSchema } from './objects/BaseCreateInput.schema';
import { BaseUncheckedCreateInputObjectSchema as BaseUncheckedCreateInputObjectSchema } from './objects/BaseUncheckedCreateInput.schema';

export const BaseCreateOneSchema: z.ZodType<Prisma.BaseCreateArgs> = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), data: z.union([BaseCreateInputObjectSchema, BaseUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.BaseCreateArgs>;

export const BaseCreateOneZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), data: z.union([BaseCreateInputObjectSchema, BaseUncheckedCreateInputObjectSchema]) }).strict();