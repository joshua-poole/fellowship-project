import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './objects/RowInclude.schema';
import { RowOrderByWithRelationInputObjectSchema as RowOrderByWithRelationInputObjectSchema } from './objects/RowOrderByWithRelationInput.schema';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './objects/RowWhereUniqueInput.schema';
import { RowScalarFieldEnumSchema } from './enums/RowScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RowFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RowSelect> = z.object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tableId: z.boolean().optional(),
    table: z.boolean().optional(),
    values: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RowSelect>;

export const RowFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tableId: z.boolean().optional(),
    table: z.boolean().optional(),
    values: z.boolean().optional()
  }).strict();

export const RowFindFirstOrThrowSchema: z.ZodType<Prisma.RowFindFirstOrThrowArgs> = z.object({ select: RowFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RowIncludeObjectSchema.optional()), orderBy: z.union([RowOrderByWithRelationInputObjectSchema, RowOrderByWithRelationInputObjectSchema.array()]).optional(), where: RowWhereInputObjectSchema.optional(), cursor: RowWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RowScalarFieldEnumSchema, RowScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RowFindFirstOrThrowArgs>;

export const RowFindFirstOrThrowZodSchema = z.object({ select: RowFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RowIncludeObjectSchema.optional()), orderBy: z.union([RowOrderByWithRelationInputObjectSchema, RowOrderByWithRelationInputObjectSchema.array()]).optional(), where: RowWhereInputObjectSchema.optional(), cursor: RowWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RowScalarFieldEnumSchema, RowScalarFieldEnumSchema.array()]).optional() }).strict();