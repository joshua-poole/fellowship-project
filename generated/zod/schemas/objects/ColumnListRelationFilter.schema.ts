import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './ColumnWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ColumnWhereInputObjectSchema).optional(),
  some: z.lazy(() => ColumnWhereInputObjectSchema).optional(),
  none: z.lazy(() => ColumnWhereInputObjectSchema).optional()
}).strict();
export const ColumnListRelationFilterObjectSchema: z.ZodType<Prisma.ColumnListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ColumnListRelationFilter>;
export const ColumnListRelationFilterObjectZodSchema = makeSchema();
