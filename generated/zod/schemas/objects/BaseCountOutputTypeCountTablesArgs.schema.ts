import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableWhereInputObjectSchema as TableWhereInputObjectSchema } from './TableWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableWhereInputObjectSchema).optional()
}).strict();
export const BaseCountOutputTypeCountTablesArgsObjectSchema = makeSchema();
export const BaseCountOutputTypeCountTablesArgsObjectZodSchema = makeSchema();
