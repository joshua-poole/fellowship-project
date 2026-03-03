import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { TableCreateManyInputObjectSchema as TableCreateManyInputObjectSchema } from './objects/TableCreateManyInput.schema';

export const TableCreateManySchema: z.ZodType<Prisma.TableCreateManyArgs> = z.object({ data: z.union([ TableCreateManyInputObjectSchema, z.array(TableCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TableCreateManyArgs>;

export const TableCreateManyZodSchema = z.object({ data: z.union([ TableCreateManyInputObjectSchema, z.array(TableCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();