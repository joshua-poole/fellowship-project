import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowOrderByWithRelationInputObjectSchema as RowOrderByWithRelationInputObjectSchema } from './objects/RowOrderByWithRelationInput.schema';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';
import { RowCountAggregateInputObjectSchema as RowCountAggregateInputObjectSchema } from './objects/RowCountAggregateInput.schema';

export const RowCountSchema: z.ZodType<Prisma.RowCountArgs> = z.object({ orderBy: z.union([RowOrderByWithRelationInputObjectSchema, RowOrderByWithRelationInputObjectSchema.array()]).optional(), where: RowWhereInputObjectSchema.optional(), cursor: RowWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RowCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RowCountArgs>;

export const RowCountZodSchema = z.object({ orderBy: z.union([RowOrderByWithRelationInputObjectSchema, RowOrderByWithRelationInputObjectSchema.array()]).optional(), where: RowWhereInputObjectSchema.optional(), cursor: RowWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RowCountAggregateInputObjectSchema ]).optional() }).strict();