import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableArgsObjectSchema as TableArgsObjectSchema } from './TableArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  type: z.boolean().optional(),
  description: z.boolean().optional(),
  default: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tableId: z.boolean().optional(),
  table: z.union([z.boolean(), z.lazy(() => TableArgsObjectSchema)]).optional()
}).strict();
export const ColumnSelectObjectSchema: z.ZodType<Prisma.ColumnSelect> = makeSchema() as unknown as z.ZodType<Prisma.ColumnSelect>;
export const ColumnSelectObjectZodSchema = makeSchema();
