import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './objects/BaseWhereInput.schema';
import { BaseOrderByWithAggregationInputObjectSchema as BaseOrderByWithAggregationInputObjectSchema } from './objects/BaseOrderByWithAggregationInput.schema';
import { BaseScalarWhereWithAggregatesInputObjectSchema as BaseScalarWhereWithAggregatesInputObjectSchema } from './objects/BaseScalarWhereWithAggregatesInput.schema';
import { BaseScalarFieldEnumSchema } from './enums/BaseScalarFieldEnum.schema';
import { BaseCountAggregateInputObjectSchema as BaseCountAggregateInputObjectSchema } from './objects/BaseCountAggregateInput.schema';
import { BaseMinAggregateInputObjectSchema as BaseMinAggregateInputObjectSchema } from './objects/BaseMinAggregateInput.schema';
import { BaseMaxAggregateInputObjectSchema as BaseMaxAggregateInputObjectSchema } from './objects/BaseMaxAggregateInput.schema';

export const BaseGroupBySchema: z.ZodType<Prisma.BaseGroupByArgs> = z.object({ where: BaseWhereInputObjectSchema.optional(), orderBy: z.union([BaseOrderByWithAggregationInputObjectSchema, BaseOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BaseScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BaseScalarFieldEnumSchema), _count: z.union([ z.literal(true), BaseCountAggregateInputObjectSchema ]).optional(), _min: BaseMinAggregateInputObjectSchema.optional(), _max: BaseMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BaseGroupByArgs>;

export const BaseGroupByZodSchema = z.object({ where: BaseWhereInputObjectSchema.optional(), orderBy: z.union([BaseOrderByWithAggregationInputObjectSchema, BaseOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BaseScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BaseScalarFieldEnumSchema), _count: z.union([ z.literal(true), BaseCountAggregateInputObjectSchema ]).optional(), _min: BaseMinAggregateInputObjectSchema.optional(), _max: BaseMaxAggregateInputObjectSchema.optional() }).strict();