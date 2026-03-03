import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseSelectObjectSchema as BaseSelectObjectSchema } from './BaseSelect.schema';
import { BaseIncludeObjectSchema as BaseIncludeObjectSchema } from './BaseInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BaseSelectObjectSchema).optional(),
  include: z.lazy(() => BaseIncludeObjectSchema).optional()
}).strict();
export const BaseArgsObjectSchema = makeSchema();
export const BaseArgsObjectZodSchema = makeSchema();
