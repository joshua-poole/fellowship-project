import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableArgsObjectSchema as TableArgsObjectSchema } from './TableArgs.schema'

const makeSchema = () => z.object({
  table: z.union([z.boolean(), z.lazy(() => TableArgsObjectSchema)]).optional()
}).strict();
export const RowIncludeObjectSchema: z.ZodType<Prisma.RowInclude> = makeSchema() as unknown as z.ZodType<Prisma.RowInclude>;
export const RowIncludeObjectZodSchema = makeSchema();
