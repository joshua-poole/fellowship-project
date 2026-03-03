import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnOrderByWithRelationInputObjectSchema as ColumnOrderByWithRelationInputObjectSchema } from './objects/ColumnOrderByWithRelationInput.schema';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './objects/ColumnWhereInput.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './objects/ColumnWhereUniqueInput.schema';
import { ColumnCountAggregateInputObjectSchema as ColumnCountAggregateInputObjectSchema } from './objects/ColumnCountAggregateInput.schema';

export const ColumnCountSchema: z.ZodType<Prisma.ColumnCountArgs> = z.object({ orderBy: z.union([ColumnOrderByWithRelationInputObjectSchema, ColumnOrderByWithRelationInputObjectSchema.array()]).optional(), where: ColumnWhereInputObjectSchema.optional(), cursor: ColumnWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ColumnCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ColumnCountArgs>;

export const ColumnCountZodSchema = z.object({ orderBy: z.union([ColumnOrderByWithRelationInputObjectSchema, ColumnOrderByWithRelationInputObjectSchema.array()]).optional(), where: ColumnWhereInputObjectSchema.optional(), cursor: ColumnWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ColumnCountAggregateInputObjectSchema ]).optional() }).strict();