import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './objects/ColumnWhereInput.schema';

export const ColumnDeleteManySchema: z.ZodType<Prisma.ColumnDeleteManyArgs> = z.object({ where: ColumnWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ColumnDeleteManyArgs>;

export const ColumnDeleteManyZodSchema = z.object({ where: ColumnWhereInputObjectSchema.optional() }).strict();