import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseOrderByWithRelationInputObjectSchema as BaseOrderByWithRelationInputObjectSchema } from './objects/BaseOrderByWithRelationInput.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';
import { BaseCountAggregateInputObjectSchema as BaseCountAggregateInputObjectSchema } from './objects/BaseCountAggregateInput.schema';

export const BaseCountSchema: z.ZodType<Prisma.BaseCountArgs> = z.object({ orderBy: z.union([BaseOrderByWithRelationInputObjectSchema, BaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: BaseWhereInputObjectSchema.optional(), cursor: BaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BaseCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BaseCountArgs>;

export const BaseCountZodSchema = z.object({ orderBy: z.union([BaseOrderByWithRelationInputObjectSchema, BaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: BaseWhereInputObjectSchema.optional(), cursor: BaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BaseCountAggregateInputObjectSchema ]).optional() }).strict();