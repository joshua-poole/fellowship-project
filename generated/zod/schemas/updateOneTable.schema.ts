import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './objects/TableSelect.schema';
import { TableIncludeObjectSchema as TableIncludeObjectSchema } from './objects/TableInclude.schema';
import { TableUpdateInputObjectSchema as TableUpdateInputObjectSchema } from './objects/TableUpdateInput.schema';
import { TableUncheckedUpdateInputObjectSchema as TableUncheckedUpdateInputObjectSchema } from './objects/TableUncheckedUpdateInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './objects/TableWhereUniqueInput.schema';

export const TableUpdateOneSchema: z.ZodType<Prisma.TableUpdateArgs> = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), data: z.union([TableUpdateInputObjectSchema, TableUncheckedUpdateInputObjectSchema]), where: TableWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TableUpdateArgs>;

export const TableUpdateOneZodSchema = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), data: z.union([TableUpdateInputObjectSchema, TableUncheckedUpdateInputObjectSchema]), where: TableWhereUniqueInputObjectSchema }).strict();