import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './objects/BaseInclude.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';

export const BaseFindUniqueSchema: z.ZodType<Prisma.BaseFindUniqueArgs> = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), where: BaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BaseFindUniqueArgs>;

export const BaseFindUniqueZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), where: BaseWhereUniqueInputObjectSchema }).strict();