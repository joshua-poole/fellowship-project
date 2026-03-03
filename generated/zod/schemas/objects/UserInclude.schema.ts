import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseFindManySchema as BaseFindManySchema } from '../findManyBase.schema';
import { TableFindManySchema as TableFindManySchema } from '../findManyTable.schema';
import { SessionFindManySchema as SessionFindManySchema } from '../findManySession.schema';
import { AccountFindManySchema as AccountFindManySchema } from '../findManyAccount.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  bases: z.union([z.boolean(), z.lazy(() => BaseFindManySchema)]).optional(),
  tables: z.union([z.boolean(), z.lazy(() => TableFindManySchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
