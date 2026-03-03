import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './objects/ColumnSelect.schema';
import { ColumnIncludeObjectSchema as ColumnIncludeObjectSchema } from './objects/ColumnInclude.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './objects/ColumnWhereUniqueInput.schema';

export const ColumnFindUniqueSchema: z.ZodType<Prisma.ColumnFindUniqueArgs> = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), where: ColumnWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ColumnFindUniqueArgs>;

export const ColumnFindUniqueZodSchema = z.object({ select: ColumnSelectObjectSchema.optional(), include: ColumnIncludeObjectSchema.optional(), where: ColumnWhereUniqueInputObjectSchema }).strict();