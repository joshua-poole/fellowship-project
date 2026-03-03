import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './BaseWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => BaseWhereInputObjectSchema).optional(),
  some: z.lazy(() => BaseWhereInputObjectSchema).optional(),
  none: z.lazy(() => BaseWhereInputObjectSchema).optional()
}).strict();
export const BaseListRelationFilterObjectSchema: z.ZodType<Prisma.BaseListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BaseListRelationFilter>;
export const BaseListRelationFilterObjectZodSchema = makeSchema();
