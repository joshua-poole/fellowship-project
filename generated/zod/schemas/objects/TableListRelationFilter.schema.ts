import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => TableWhereInputObjectSchema).optional(),
  some: z.lazy(() => TableWhereInputObjectSchema).optional(),
  none: z.lazy(() => TableWhereInputObjectSchema).optional()
}).strict();
export const TableListRelationFilterObjectSchema: z.ZodType<Prisma.TableListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.TableListRelationFilter>;
export const TableListRelationFilterObjectZodSchema = makeSchema();
