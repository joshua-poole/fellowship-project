import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseOrderByWithRelationInputObjectSchema as BaseOrderByWithRelationInputObjectSchema } from './objects/BaseOrderByWithRelationInput.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './objects/BaseWhereUniqueInput.schema';
import { BaseCountAggregateInputObjectSchema as BaseCountAggregateInputObjectSchema } from './objects/BaseCountAggregateInput.schema';
import { BaseMinAggregateInputObjectSchema as BaseMinAggregateInputObjectSchema } from './objects/BaseMinAggregateInput.schema';
import { BaseMaxAggregateInputObjectSchema as BaseMaxAggregateInputObjectSchema } from './objects/BaseMaxAggregateInput.schema';

export const BaseAggregateSchema: z.ZodType<Prisma.BaseAggregateArgs> = z.object({ orderBy: z.union([BaseOrderByWithRelationInputObjectSchema, BaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: BaseWhereInputObjectSchema.optional(), cursor: BaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BaseCountAggregateInputObjectSchema ]).optional(), _min: BaseMinAggregateInputObjectSchema.optional(), _max: BaseMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BaseAggregateArgs>;

export const BaseAggregateZodSchema = z.object({ orderBy: z.union([BaseOrderByWithRelationInputObjectSchema, BaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: BaseWhereInputObjectSchema.optional(), cursor: BaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BaseCountAggregateInputObjectSchema ]).optional(), _min: BaseMinAggregateInputObjectSchema.optional(), _max: BaseMaxAggregateInputObjectSchema.optional() }).strict();