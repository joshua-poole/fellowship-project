import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './RowWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => RowWhereInputObjectSchema).optional(),
  some: z.lazy(() => RowWhereInputObjectSchema).optional(),
  none: z.lazy(() => RowWhereInputObjectSchema).optional()
}).strict();
export const RowListRelationFilterObjectSchema: z.ZodType<Prisma.RowListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RowListRelationFilter>;
export const RowListRelationFilterObjectZodSchema = makeSchema();
