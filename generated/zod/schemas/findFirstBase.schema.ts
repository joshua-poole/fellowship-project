import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './objects/BaseInclude.schema';
import { BaseOrderByWithRelationInputObjectSchema as BaseOrderByWithRelationInputObjectSchema } from './objects/BaseOrderByWithRelationInput.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';
import { BaseScalarFieldEnumSchema } from './enums/BaseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BaseFindFirstSelectSchema: z.ZodType<Prisma.BaseSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    tables: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BaseSelect>;

export const BaseFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    tables: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const BaseFindFirstSchema: z.ZodType<Prisma.BaseFindFirstArgs> = z.object({ select: BaseFindFirstSelectSchema.optional(), include: z.lazy(() => BaseIncludeObjectSchema.optional()), orderBy: z.union([BaseOrderByWithRelationInputObjectSchema, BaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: BaseWhereInputObjectSchema.optional(), cursor: BaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BaseScalarFieldEnumSchema, BaseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BaseFindFirstArgs>;

export const BaseFindFirstZodSchema = z.object({ select: BaseFindFirstSelectSchema.optional(), include: z.lazy(() => BaseIncludeObjectSchema.optional()), orderBy: z.union([BaseOrderByWithRelationInputObjectSchema, BaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: BaseWhereInputObjectSchema.optional(), cursor: BaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BaseScalarFieldEnumSchema, BaseScalarFieldEnumSchema.array()]).optional() }).strict();