import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnSelectObjectSchema as ColumnSelectObjectSchema } from './ColumnSelect.schema';
import { ColumnIncludeObjectSchema as ColumnIncludeObjectSchema } from './ColumnInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ColumnSelectObjectSchema).optional(),
  include: z.lazy(() => ColumnIncludeObjectSchema).optional()
}).strict();
export const ColumnArgsObjectSchema = makeSchema();
export const ColumnArgsObjectZodSchema = makeSchema();
