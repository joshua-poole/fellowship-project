import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';

export const RowDeleteManySchema: z.ZodType<Prisma.RowDeleteManyArgs> = z.object({ where: RowWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RowDeleteManyArgs>;

export const RowDeleteManyZodSchema = z.object({ where: RowWhereInputObjectSchema.optional() }).strict();