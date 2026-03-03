import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => TableWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => TableWhereInputObjectSchema).optional()
}).strict();
export const TableScalarRelationFilterObjectSchema: z.ZodType<Prisma.TableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TableScalarRelationFilter>;
export const TableScalarRelationFilterObjectZodSchema = makeSchema();
