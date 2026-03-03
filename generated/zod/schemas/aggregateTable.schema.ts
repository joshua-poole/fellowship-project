import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './objects/TableOrderByWithRelationInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './objects/TableWhereUniqueInput.schema';
import { TableCountAggregateInputObjectSchema as TableCountAggregateInputObjectSchema } from './objects/TableCountAggregateInput.schema';
import { TableMinAggregateInputObjectSchema as TableMinAggregateInputObjectSchema } from './objects/TableMinAggregateInput.schema';
import { TableMaxAggregateInputObjectSchema as TableMaxAggregateInputObjectSchema } from './objects/TableMaxAggregateInput.schema';

export const TableAggregateSchema: z.ZodType<Prisma.TableAggregateArgs> = z.object({ orderBy: z.union([TableOrderByWithRelationInputObjectSchema, TableOrderByWithRelationInputObjectSchema.array()]).optional(), where: TableWhereInputObjectSchema.optional(), cursor: TableWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), TableCountAggregateInputObjectSchema ]).optional(), _min: TableMinAggregateInputObjectSchema.optional(), _max: TableMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TableAggregateArgs>;

export const TableAggregateZodSchema = z.object({ orderBy: z.union([TableOrderByWithRelationInputObjectSchema, TableOrderByWithRelationInputObjectSchema.array()]).optional(), where: TableWhereInputObjectSchema.optional(), cursor: TableWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), TableCountAggregateInputObjectSchema ]).optional(), _min: TableMinAggregateInputObjectSchema.optional(), _max: TableMaxAggregateInputObjectSchema.optional() }).strict();