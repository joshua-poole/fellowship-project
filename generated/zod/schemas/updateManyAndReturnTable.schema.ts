import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './objects/TableSelect.schema';
import { TableUpdateManyMutationInputObjectSchema as TableUpdateManyMutationInputObjectSchema } from './objects/TableUpdateManyMutationInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';

export const TableUpdateManyAndReturnSchema: z.ZodType<Prisma.TableUpdateManyAndReturnArgs> = z.object({ select: TableSelectObjectSchema.optional(), data: TableUpdateManyMutationInputObjectSchema, where: TableWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TableUpdateManyAndReturnArgs>;

export const TableUpdateManyAndReturnZodSchema = z.object({ select: TableSelectObjectSchema.optional(), data: TableUpdateManyMutationInputObjectSchema, where: TableWhereInputObjectSchema.optional() }).strict();