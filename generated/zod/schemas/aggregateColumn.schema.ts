import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnOrderByWithRelationInputObjectSchema as ColumnOrderByWithRelationInputObjectSchema } from './objects/ColumnOrderByWithRelationInput.schema';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './objects/ColumnWhereInput.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './objects/ColumnWhereUniqueInput.schema';
import { ColumnCountAggregateInputObjectSchema as ColumnCountAggregateInputObjectSchema } from './objects/ColumnCountAggregateInput.schema';
import { ColumnMinAggregateInputObjectSchema as ColumnMinAggregateInputObjectSchema } from './objects/ColumnMinAggregateInput.schema';
import { ColumnMaxAggregateInputObjectSchema as ColumnMaxAggregateInputObjectSchema } from './objects/ColumnMaxAggregateInput.schema';
import { ColumnAvgAggregateInputObjectSchema as ColumnAvgAggregateInputObjectSchema } from './objects/ColumnAvgAggregateInput.schema';
import { ColumnSumAggregateInputObjectSchema as ColumnSumAggregateInputObjectSchema } from './objects/ColumnSumAggregateInput.schema';

export const ColumnAggregateSchema: z.ZodType<Prisma.ColumnAggregateArgs> = z.object({ orderBy: z.union([ColumnOrderByWithRelationInputObjectSchema, ColumnOrderByWithRelationInputObjectSchema.array()]).optional(), where: ColumnWhereInputObjectSchema.optional(), cursor: ColumnWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ColumnCountAggregateInputObjectSchema ]).optional(), _min: ColumnMinAggregateInputObjectSchema.optional(), _max: ColumnMaxAggregateInputObjectSchema.optional(), _avg: ColumnAvgAggregateInputObjectSchema.optional(), _sum: ColumnSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ColumnAggregateArgs>;

export const ColumnAggregateZodSchema = z.object({ orderBy: z.union([ColumnOrderByWithRelationInputObjectSchema, ColumnOrderByWithRelationInputObjectSchema.array()]).optional(), where: ColumnWhereInputObjectSchema.optional(), cursor: ColumnWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ColumnCountAggregateInputObjectSchema ]).optional(), _min: ColumnMinAggregateInputObjectSchema.optional(), _max: ColumnMaxAggregateInputObjectSchema.optional(), _avg: ColumnAvgAggregateInputObjectSchema.optional(), _sum: ColumnSumAggregateInputObjectSchema.optional() }).strict();