import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateNestedManyWithoutUserInputObjectSchema as BaseCreateNestedManyWithoutUserInputObjectSchema } from './BaseCreateNestedManyWithoutUserInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema as SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bases: z.lazy(() => BaseCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutTablesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutTablesInput>;
export const UserCreateWithoutTablesInputObjectZodSchema = makeSchema();
