import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './objects/PostWhereInput.schema';
import { PostOrderByWithAggregationInputObjectSchema as PostOrderByWithAggregationInputObjectSchema } from './objects/PostOrderByWithAggregationInput.schema';
import { PostScalarWhereWithAggregatesInputObjectSchema as PostScalarWhereWithAggregatesInputObjectSchema } from './objects/PostScalarWhereWithAggregatesInput.schema';
import { PostScalarFieldEnumSchema } from './enums/PostScalarFieldEnum.schema';
import { PostCountAggregateInputObjectSchema as PostCountAggregateInputObjectSchema } from './objects/PostCountAggregateInput.schema';
import { PostMinAggregateInputObjectSchema as PostMinAggregateInputObjectSchema } from './objects/PostMinAggregateInput.schema';
import { PostMaxAggregateInputObjectSchema as PostMaxAggregateInputObjectSchema } from './objects/PostMaxAggregateInput.schema';

export const PostGroupBySchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({ where: PostWhereInputObjectSchema.optional(), orderBy: z.union([PostOrderByWithAggregationInputObjectSchema, PostOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PostScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PostScalarFieldEnumSchema), _count: z.union([ z.literal(true), PostCountAggregateInputObjectSchema ]).optional(), _min: PostMinAggregateInputObjectSchema.optional(), _max: PostMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PostGroupByArgs>;

export const PostGroupByZodSchema = z.object({ where: PostWhereInputObjectSchema.optional(), orderBy: z.union([PostOrderByWithAggregationInputObjectSchema, PostOrderByWithAggregationInputObjectSchema.array()]).optional(), having: PostScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(PostScalarFieldEnumSchema), _count: z.union([ z.literal(true), PostCountAggregateInputObjectSchema ]).optional(), _min: PostMinAggregateInputObjectSchema.optional(), _max: PostMaxAggregateInputObjectSchema.optional() }).strict();