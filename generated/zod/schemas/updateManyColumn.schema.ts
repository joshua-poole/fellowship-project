import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnUpdateManyMutationInputObjectSchema as ColumnUpdateManyMutationInputObjectSchema } from './objects/ColumnUpdateManyMutationInput.schema';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './objects/ColumnWhereInput.schema';

export const ColumnUpdateManySchema: z.ZodType<Prisma.ColumnUpdateManyArgs> = z.object({ data: ColumnUpdateManyMutationInputObjectSchema, where: ColumnWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ColumnUpdateManyArgs>;

export const ColumnUpdateManyZodSchema = z.object({ data: ColumnUpdateManyMutationInputObjectSchema, where: ColumnWhereInputObjectSchema.optional() }).strict();