import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowUpdateManyMutationInputObjectSchema as RowUpdateManyMutationInputObjectSchema } from './objects/RowUpdateManyMutationInput.schema';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';

export const RowUpdateManySchema: z.ZodType<Prisma.RowUpdateManyArgs> = z.object({ data: RowUpdateManyMutationInputObjectSchema, where: RowWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RowUpdateManyArgs>;

export const RowUpdateManyZodSchema = z.object({ data: RowUpdateManyMutationInputObjectSchema, where: RowWhereInputObjectSchema.optional() }).strict();