import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseArgsObjectSchema as BaseArgsObjectSchema } from './BaseArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ColumnFindManySchema as ColumnFindManySchema } from '../findManyColumn.schema';
import { RowFindManySchema as RowFindManySchema } from '../findManyRow.schema';
import { TableCountOutputTypeArgsObjectSchema as TableCountOutputTypeArgsObjectSchema } from './TableCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  base: z.union([z.boolean(), z.lazy(() => BaseArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  columns: z.union([z.boolean(), z.lazy(() => ColumnFindManySchema)]).optional(),
  rows: z.union([z.boolean(), z.lazy(() => RowFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => TableCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const TableIncludeObjectSchema: z.ZodType<Prisma.TableInclude> = makeSchema() as unknown as z.ZodType<Prisma.TableInclude>;
export const TableIncludeObjectZodSchema = makeSchema();
