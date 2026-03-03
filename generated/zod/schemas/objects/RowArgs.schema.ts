import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowSelectObjectSchema as RowSelectObjectSchema } from './RowSelect.schema';
import { RowIncludeObjectSchema as RowIncludeObjectSchema } from './RowInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RowSelectObjectSchema).optional(),
  include: z.lazy(() => RowIncludeObjectSchema).optional()
}).strict();
export const RowArgsObjectSchema = makeSchema();
export const RowArgsObjectZodSchema = makeSchema();
