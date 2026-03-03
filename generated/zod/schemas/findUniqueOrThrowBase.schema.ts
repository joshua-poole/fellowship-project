import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './objects/BaseSelect.schema';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './objects/BaseInclude.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';

export const BaseFindUniqueOrThrowSchema: z.ZodType<Prisma.BaseFindUniqueOrThrowArgs> = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), where: BaseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BaseFindUniqueOrThrowArgs>;

export const BaseFindUniqueOrThrowZodSchema = z.object({ select: BaseSelectObjectSchema.optional(), include: BaseIncludeObjectSchema.optional(), where: BaseWhereUniqueInputObjectSchema }).strict();