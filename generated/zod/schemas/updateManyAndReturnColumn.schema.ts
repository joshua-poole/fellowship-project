import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './objects/ColumnSelect.schema';
import { ColumnUpdateManyMutationInputObjectSchema as ColumnUpdateManyMutationInputObjectSchema } from './objects/ColumnUpdateManyMutationInput.schema';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './objects/ColumnWhereInput.schema';

export const ColumnUpdateManyAndReturnSchema: z.ZodType<Prisma.ColumnUpdateManyAndReturnArgs> = z.object({ select: ColumnSelectObjectSchema.optional(), data: ColumnUpdateManyMutationInputObjectSchema, where: ColumnWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ColumnUpdateManyAndReturnArgs>;

export const ColumnUpdateManyAndReturnZodSchema = z.object({ select: ColumnSelectObjectSchema.optional(), data: ColumnUpdateManyMutationInputObjectSchema, where: ColumnWhereInputObjectSchema.optional() }).strict();