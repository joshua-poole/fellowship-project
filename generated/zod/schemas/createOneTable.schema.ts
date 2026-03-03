import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './objects/TableSelect.schema';
import { TableIncludeObjectSchema as TableIncludeObjectSchema } from './objects/TableInclude.schema';
import { TableCreateInputObjectSchema as TableCreateInputObjectSchema } from './objects/TableCreateInput.schema';
import { TableUncheckedCreateInputObjectSchema as TableUncheckedCreateInputObjectSchema } from './objects/TableUncheckedCreateInput.schema';

export const TableCreateOneSchema: z.ZodType<Prisma.TableCreateArgs> = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), data: z.union([TableCreateInputObjectSchema, TableUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.TableCreateArgs>;

export const TableCreateOneZodSchema = z.object({ select: TableSelectObjectSchema.optional(), include: TableIncludeObjectSchema.optional(), data: z.union([TableCreateInputObjectSchema, TableUncheckedCreateInputObjectSchema]) }).strict();