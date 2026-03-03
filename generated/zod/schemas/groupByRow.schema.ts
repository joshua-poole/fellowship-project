import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';
import { RowOrderByWithAggregationInputObjectSchema as RowOrderByWithAggregationInputObjectSchema } from './objects/RowOrderByWithAggregationInput.schema';
import { RowScalarWhereWithAggregatesInputObjectSchema as RowScalarWhereWithAggregatesInputObjectSchema } from './objects/RowScalarWhereWithAggregatesInput.schema';
import { RowScalarFieldEnumSchema } from './enums/RowScalarFieldEnum.schema';
import { RowCountAggregateInputObjectSchema as RowCountAggregateInputObjectSchema } from './objects/RowCountAggregateInput.schema';
import { RowMinAggregateInputObjectSchema as RowMinAggregateInputObjectSchema } from './objects/RowMinAggregateInput.schema';
import { RowMaxAggregateInputObjectSchema as RowMaxAggregateInputObjectSchema } from './objects/RowMaxAggregateInput.schema';

export const RowGroupBySchema: z.ZodType<Prisma.RowGroupByArgs> = z.object({ where: RowWhereInputObjectSchema.optional(), orderBy: z.union([RowOrderByWithAggregationInputObjectSchema, RowOrderByWithAggregationInputObjectSchema.array()]).optional(), having: RowScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RowScalarFieldEnumSchema), _count: z.union([ z.literal(true), RowCountAggregateInputObjectSchema ]).optional(), _min: RowMinAggregateInputObjectSchema.optional(), _max: RowMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RowGroupByArgs>;

export const RowGroupByZodSchema = z.object({ where: RowWhereInputObjectSchema.optional(), orderBy: z.union([RowOrderByWithAggregationInputObjectSchema, RowOrderByWithAggregationInputObjectSchema.array()]).optional(), having: RowScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RowScalarFieldEnumSchema), _count: z.union([ z.literal(true), RowCountAggregateInputObjectSchema ]).optional(), _min: RowMinAggregateInputObjectSchema.optional(), _max: RowMaxAggregateInputObjectSchema.optional() }).strict();