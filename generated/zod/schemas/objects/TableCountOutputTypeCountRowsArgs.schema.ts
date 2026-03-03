import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowWhereInputObjectSchema as RowWhereInputObjectSchema } from './RowWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RowWhereInputObjectSchema).optional()
}).strict();
export const TableCountOutputTypeCountRowsArgsObjectSchema = makeSchema();
export const TableCountOutputTypeCountRowsArgsObjectZodSchema = makeSchema();
