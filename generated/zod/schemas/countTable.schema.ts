import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './objects/TableOrderByWithRelationInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './objects/TableWhereUniqueInput.schema';
import { TableCountAggregateInputObjectSchema as TableCountAggregateInputObjectSchema } from './objects/TableCountAggregateInput.schema';

export const TableCountSchema: z.ZodType<Prisma.TableCountArgs> = z.object({ orderBy: z.union([TableOrderByWithRelationInputObjectSchema, TableOrderByWithRelationInputObjectSchema.array()]).optional(), where: TableWhereInputObjectSchema.optional(), cursor: TableWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TableCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.TableCountArgs>;

export const TableCountZodSchema = z.object({ orderBy: z.union([TableOrderByWithRelationInputObjectSchema, TableOrderByWithRelationInputObjectSchema.array()]).optional(), where: TableWhereInputObjectSchema.optional(), cursor: TableWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TableCountAggregateInputObjectSchema ]).optional() }).strict();