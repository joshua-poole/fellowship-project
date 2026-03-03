import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './objects/TableSelect.schema';
import { TableIncludeObjectSchema as TableIncludeObjectSchema } from './objects/TableInclude.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './objects/TableWhereUniqueInput.schema';

export const TableDeleteOneSchema: z.ZodType<Prisma.TableDeleteArgs> = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), where: TableWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TableDeleteArgs>;

export const TableDeleteOneZodSchema = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), where: TableWhereUniqueInputObjectSchema }).strict();