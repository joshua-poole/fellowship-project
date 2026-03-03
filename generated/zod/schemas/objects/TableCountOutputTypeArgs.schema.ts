import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCountOutputTypeSelectObjectSchema as TableCountOutputTypeSelectObjectSchema } from './TableCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TableCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const TableCountOutputTypeArgsObjectSchema = makeSchema();
export const TableCountOutputTypeArgsObjectZodSchema = makeSchema();
