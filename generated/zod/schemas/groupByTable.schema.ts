import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';
import { TableOrderByWithAggregationInputObjectSchema as TableOrderByWithAggregationInputObjectSchema } from './objects/TableOrderByWithAggregationInput.schema';
import { TableScalarWhereWithAggregatesInputObjectSchema as TableScalarWhereWithAggregatesInputObjectSchema } from './objects/TableScalarWhereWithAggregatesInput.schema';
import { TableScalarFieldEnumSchema } from './enums/TableScalarFieldEnum.schema';
import { TableCountAggregateInputObjectSchema as TableCountAggregateInputObjectSchema } from './objects/TableCountAggregateInput.schema';
import { TableMinAggregateInputObjectSchema as TableMinAggregateInputObjectSchema } from './objects/TableMinAggregateInput.schema';
import { TableMaxAggregateInputObjectSchema as TableMaxAggregateInputObjectSchema } from './objects/TableMaxAggregateInput.schema';

export const TableGroupBySchema: z.ZodType<Prisma.TableGroupByArgs> = z.object({ where: TableWhereInputObjectSchema.optional(), orderBy: z.union([TableOrderByWithAggregationInputObjectSchema, TableOrderByWithAggregationInputObjectSchema.array()]).optional(), having: TableScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(TableScalarFieldEnumSchema), _count: z.union([ z.literal(true), TableCountAggregateInputObjectSchema ]).optional(), _min: TableMinAggregateInputObjectSchema.optional(), _max: TableMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TableGroupByArgs>;

export const TableGroupByZodSchema = z.object({ where: TableWhereInputObjectSchema.optional(), orderBy: z.union([TableOrderByWithAggregationInputObjectSchema, TableOrderByWithAggregationInputObjectSchema.array()]).optional(), having: TableScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(TableScalarFieldEnumSchema), _count: z.union([ z.literal(true), TableCountAggregateInputObjectSchema ]).optional(), _min: TableMinAggregateInputObjectSchema.optional(), _max: TableMaxAggregateInputObjectSchema.optional() }).strict();