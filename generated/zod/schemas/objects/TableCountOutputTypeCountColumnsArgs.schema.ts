import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnWhereInputObjectSchema as ColumnWhereInputObjectSchema } from './ColumnWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ColumnWhereInputObjectSchema).optional()
}).strict();
export const TableCountOutputTypeCountColumnsArgsObjectSchema = makeSchema();
export const TableCountOutputTypeCountColumnsArgsObjectZodSchema = makeSchema();
