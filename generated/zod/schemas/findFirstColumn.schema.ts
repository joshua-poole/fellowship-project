import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnIncludeObjectSchema as ColumnIncludeObjectSchema } from './objects/ColumnInclude.schema';
import { ColumnOrderByWithRelationInputObjectSchema as ColumnOrderByWithRelationInputObjectSchema } from './objects/ColumnOrderByWithRelationInput.schema';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './objects/ColumnWhereInput.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './objects/ColumnWhereUniqueInput.schema';
import { ColumnScalarFieldEnumSchema } from './enums/ColumnScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ColumnFindFirstSelectSchema: z.ZodType<Prisma.ColumnSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    type: z.boolean().optional(),
    order: z.boolean().optional(),
    description: z.boolean().optional(),
    defaultValue: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tableId: z.boolean().optional(),
    table: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ColumnSelect>;

export const ColumnFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    type: z.boolean().optional(),
    order: z.boolean().optional(),
    description: z.boolean().optional(),
    defaultValue: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tableId: z.boolean().optional(),
    table: z.boolean().optional()
  }).strict();

export const ColumnFindFirstSchema: z.ZodType<Prisma.ColumnFindFirstArgs> = z.object({ select: ColumnFindFirstSelectSchema.optional(), include: z.lazy(() => ColumnIncludeObjectSchema.optional()), orderBy: z.union([ColumnOrderByWithRelationInputObjectSchema, ColumnOrderByWithRelationInputObjectSchema.array()]).optional(), where: ColumnWhereInputObjectSchema.optional(), cursor: ColumnWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ColumnScalarFieldEnumSchema, ColumnScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ColumnFindFirstArgs>;

export const ColumnFindFirstZodSchema = z.object({ select: ColumnFindFirstSelectSchema.optional(), include: z.lazy(() => ColumnIncludeObjectSchema.optional()), orderBy: z.union([ColumnOrderByWithRelationInputObjectSchema, ColumnOrderByWithRelationInputObjectSchema.array()]).optional(), where: ColumnWhereInputObjectSchema.optional(), cursor: ColumnWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ColumnScalarFieldEnumSchema, ColumnScalarFieldEnumSchema.array()]).optional() }).strict();