import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './objects/RowSelect.schema';
import { RowUpdateManyMutationInputObjectSchema as RowUpdateManyMutationInputObjectSchema } from './objects/RowUpdateManyMutationInput.schema';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './objects/RowWhereInput.schema';

export const RowUpdateManyAndReturnSchema: z.ZodType<Prisma.RowUpdateManyAndReturnArgs> = z.object({ select: RowSelectObjectSchema.optional(), data: RowUpdateManyMutationInputObjectSchema, where: RowWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RowUpdateManyAndReturnArgs>;

export const RowUpdateManyAndReturnZodSchema = z.object({ select: RowSelectObjectSchema.optional(), data: RowUpdateManyMutationInputObjectSchema, where: RowWhereInputObjectSchema.optional() }).strict();