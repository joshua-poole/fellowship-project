import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableFindManySchema as TableFindManySchema } from '../findManyTable.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { BaseCountOutputTypeArgsObjectSchema as BaseCountOutputTypeArgsObjectSchema } from './BaseCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  tables: z.union([z.boolean(), z.lazy(() => TableFindManySchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BaseCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BaseIncludeObjectSchema: z.ZodType<Prisma.BaseInclude> = makeSchema() as unknown as z.ZodType<Prisma.BaseInclude>;
export const BaseIncludeObjectZodSchema = makeSchema();
