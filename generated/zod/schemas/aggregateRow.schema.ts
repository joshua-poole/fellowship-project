import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowOrderByWithRelationInputObjectSchema as RowOrderByWithRelationInputObjectSchema } from './objects/RowOrderByWithRelationInput.schema';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';
import { RowCountAggregateInputObjectSchema as RowCountAggregateInputObjectSchema } from './objects/RowCountAggregateInput.schema';
import { RowMinAggregateInputObjectSchema as RowMinAggregateInputObjectSchema } from './objects/RowMinAggregateInput.schema';
import { RowMaxAggregateInputObjectSchema as RowMaxAggregateInputObjectSchema } from './objects/RowMaxAggregateInput.schema';

export const RowAggregateSchema: z.ZodType<Prisma.RowAggregateArgs> = z.object({ orderBy: z.union([RowOrderByWithRelationInputObjectSchema, RowOrderByWithRelationInputObjectSchema.array()]).optional(), where: RowWhereInputObjectSchema.optional(), cursor: RowWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), RowCountAggregateInputObjectSchema ]).optional(), _min: RowMinAggregateInputObjectSchema.optional(), _max: RowMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RowAggregateArgs>;

export const RowAggregateZodSchema = z.object({ orderBy: z.union([RowOrderByWithRelationInputObjectSchema, RowOrderByWithRelationInputObjectSchema.array()]).optional(), where: RowWhereInputObjectSchema.optional(), cursor: RowWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), RowCountAggregateInputObjectSchema ]).optional(), _min: RowMinAggregateInputObjectSchema.optional(), _max: RowMaxAggregateInputObjectSchema.optional() }).strict();