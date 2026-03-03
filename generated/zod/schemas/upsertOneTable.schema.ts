import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './objects/TableSelect.schema';
import { TableIncludeObjectSchema as TableIncludeObjectSchema } from './objects/TableInclude.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './objects/TableWhereUniqueInput.schema';
import { TableCreateInputObjectSchema as TableCreateInputObjectSchema } from './objects/TableCreateInput.schema';
import { TableUncheckedCreateInputObjectSchema as TableUncheckedCreateInputObjectSchema } from './objects/TableUncheckedCreateInput.schema';
import { TableUpdateInputObjectSchema as TableUpdateInputObjectSchema } from './objects/TableUpdateInput.schema';
import { TableUncheckedUpdateInputObjectSchema as TableUncheckedUpdateInputObjectSchema } from './objects/TableUncheckedUpdateInput.schema';

export const TableUpsertOneSchema: z.ZodType<Prisma.TableUpsertArgs> = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), where: TableWhereUniqueInputObjectSchema, create: z.union([ TableCreateInputObjectSchema, TableUncheckedCreateInputObjectSchema ]), update: z.union([ TableUpdateInputObjectSchema, TableUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.TableUpsertArgs>;

export const TableUpsertOneZodSchema = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), where: TableWhereUniqueInputObjectSchema, create: z.union([ TableCreateInputObjectSchema, TableUncheckedCreateInputObjectSchema ]), update: z.union([ TableUpdateInputObjectSchema, TableUncheckedUpdateInputObjectSchema ]) }).strict();