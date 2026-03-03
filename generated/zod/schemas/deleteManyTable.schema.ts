import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './objects/TableWhereInput.schema';

export const TableDeleteManySchema: z.ZodType<Prisma.TableDeleteManyArgs> = z.object({ where: TableWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TableDeleteManyArgs>;

export const TableDeleteManyZodSchema = z.object({ where: TableWhereInputObjectSchema.optional() }).strict();