import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableArgsObjectSchema as TableArgsObjectSchema } from './TableArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tableId: z.boolean().optional(),
  table: z.union([z.boolean(), z.lazy(() => TableArgsObjectSchema)]).optional(),
  values: z.boolean().optional()
}).strict();
export const RowSelectObjectSchema: z.ZodType<Prisma.RowSelect> = makeSchema() as unknown as z.ZodType<Prisma.RowSelect>;
export const RowSelectObjectZodSchema = makeSchema();
