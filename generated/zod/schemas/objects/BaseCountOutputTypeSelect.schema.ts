import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCountOutputTypeCountTablesArgsObjectSchema as BaseCountOutputTypeCountTablesArgsObjectSchema } from './BaseCountOutputTypeCountTablesArgs.schema'

const makeSchema = () => z.object({
  tables: z.union([z.boolean(), z.lazy(() => BaseCountOutputTypeCountTablesArgsObjectSchema)]).optional()
}).strict();
export const BaseCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.BaseCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.BaseCountOutputTypeSelect>;
export const BaseCountOutputTypeSelectObjectZodSchema = makeSchema();
