import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableSelectObjectSchema as TableSelectObjectSchema } from './TableSelect.schema';
import { TableIncludeObjectSchema as TableIncludeObjectSchema } from './TableInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TableSelectObjectSchema).optional(),
  include: z.lazy(() => TableIncludeObjectSchema).optional()
}).strict();
export const TableArgsObjectSchema = makeSchema();
export const TableArgsObjectZodSchema = makeSchema();
