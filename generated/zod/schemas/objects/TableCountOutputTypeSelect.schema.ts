import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCountOutputTypeCountColumnsArgsObjectSchema as TableCountOutputTypeCountColumnsArgsObjectSchema } from './TableCountOutputTypeCountColumnsArgs.schema';
import { TableCountOutputTypeCountRowsArgsObjectSchema as TableCountOutputTypeCountRowsArgsObjectSchema } from './TableCountOutputTypeCountRowsArgs.schema';
import { TableCountOutputTypeCountViewsArgsObjectSchema as TableCountOutputTypeCountViewsArgsObjectSchema } from './TableCountOutputTypeCountViewsArgs.schema'

const makeSchema = () => z.object({
  columns: z.union([z.boolean(), z.lazy(() => TableCountOutputTypeCountColumnsArgsObjectSchema)]).optional(),
  rows: z.union([z.boolean(), z.lazy(() => TableCountOutputTypeCountRowsArgsObjectSchema)]).optional(),
  views: z.union([z.boolean(), z.lazy(() => TableCountOutputTypeCountViewsArgsObjectSchema)]).optional()
}).strict();
export const TableCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.TableCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.TableCountOutputTypeSelect>;
export const TableCountOutputTypeSelectObjectZodSchema = makeSchema();
