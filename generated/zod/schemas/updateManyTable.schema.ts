import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableUpdateManyMutationInputObjectSchema as TableUpdateManyMutationInputObjectSchema } from './objects/TableUpdateManyMutationInput.schema';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';

export const TableUpdateManySchema: z.ZodType<Prisma.TableUpdateManyArgs> = z.object({ data: TableUpdateManyMutationInputObjectSchema, where: TableWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TableUpdateManyArgs>;

export const TableUpdateManyZodSchema = z.object({ data: TableUpdateManyMutationInputObjectSchema, where: TableWhereInputObjectSchema.optional() }).strict();