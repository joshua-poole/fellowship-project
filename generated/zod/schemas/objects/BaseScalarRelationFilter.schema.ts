import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './BaseWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => BaseWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => BaseWhereInputObjectSchema).optional()
}).strict();
export const BaseScalarRelationFilterObjectSchema: z.ZodType<Prisma.BaseScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BaseScalarRelationFilter>;
export const BaseScalarRelationFilterObjectZodSchema = makeSchema();
