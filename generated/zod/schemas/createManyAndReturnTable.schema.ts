import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './objects/TableSelect.schema';
import { TableCreateManyInputObjectSchema as TableCreateManyInputObjectSchema } from './objects/TableCreateManyInput.schema';

export const TableCreateManyAndReturnSchema: z.ZodType<Prisma.TableCreateManyAndReturnArgs> = z.object({ select: TableSelectObjectSchema.optional(), data: z.union([ TableCreateManyInputObjectSchema, z.array(TableCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TableCreateManyAndReturnArgs>;

export const TableCreateManyAndReturnZodSchema = z.object({ select: TableSelectObjectSchema.optional(), data: z.union([ TableCreateManyInputObjectSchema, z.array(TableCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();