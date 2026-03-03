import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseArgsObjectSchema as BaseArgsObjectSchema } from './BaseArgs.schema';
import { ColumnFindManySchema as ColumnFindManySchema } from '../findManyColumn.schema';
import { RowFindManySchema as RowFindManySchema } from '../findManyRow.schema';
import { ViewFindManySchema as ViewFindManySchema } from '../findManyView.schema';
import { TableCountOutputTypeArgsObjectSchema as TableCountOutputTypeArgsObjectSchema } from './TableCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  baseId: z.boolean().optional(),
  base: z.union([z.boolean(), z.lazy(() => BaseArgsObjectSchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  columns: z.union([z.boolean(), z.lazy(() => ColumnFindManySchema)]).optional(),
  rows: z.union([z.boolean(), z.lazy(() => RowFindManySchema)]).optional(),
  views: z.union([z.boolean(), z.lazy(() => ViewFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => TableCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const TableSelectObjectSchema: z.ZodType<Prisma.TableSelect> = makeSchema() as unknown as z.ZodType<Prisma.TableSelect>;
export const TableSelectObjectZodSchema = makeSchema();
