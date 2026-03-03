import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableIncludeObjectSchema as TableIncludeObjectSchema } from './objects/TableInclude.schema';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './objects/TableOrderByWithRelationInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './objects/TableWhereUniqueInput.schema';
import { TableScalarFieldEnumSchema } from './enums/TableScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TableFindFirstSelectSchema: z.ZodType<Prisma.TableSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    baseId: z.boolean().optional(),
    base: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    columns: z.boolean().optional(),
    rows: z.boolean().optional(),
    views: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TableSelect>;

export const TableFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    baseId: z.boolean().optional(),
    base: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    columns: z.boolean().optional(),
    rows: z.boolean().optional(),
    views: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const TableFindFirstSchema: z.ZodType<Prisma.TableFindFirstArgs> = z.object({ select: TableFindFirstSelectSchema.optional(), include: z.lazy(() => TableIncludeObjectSchema.optional()), orderBy: z.union([TableOrderByWithRelationInputObjectSchema, TableOrderByWithRelationInputObjectSchema.array()]).optional(), where: TableWhereInputObjectSchema.optional(), cursor: TableWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TableScalarFieldEnumSchema, TableScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TableFindFirstArgs>;

export const TableFindFirstZodSchema = z.object({ select: TableFindFirstSelectSchema.optional(), include: z.lazy(() => TableIncludeObjectSchema.optional()), orderBy: z.union([TableOrderByWithRelationInputObjectSchema, TableOrderByWithRelationInputObjectSchema.array()]).optional(), where: TableWhereInputObjectSchema.optional(), cursor: TableWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TableScalarFieldEnumSchema, TableScalarFieldEnumSchema.array()]).optional() }).strict();