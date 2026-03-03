import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateNestedManyWithoutUserInputObjectSchema as BaseCreateNestedManyWithoutUserInputObjectSchema } from './BaseCreateNestedManyWithoutUserInput.schema';
import { TableCreateNestedManyWithoutUserInputObjectSchema as TableCreateNestedManyWithoutUserInputObjectSchema } from './TableCreateNestedManyWithoutUserInput.schema';
import { SessionCreateNestedManyWithoutUserInputObjectSchema as SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bases: z.lazy(() => BaseCreateNestedManyWithoutUserInputObjectSchema).optional(),
  tables: z.lazy(() => TableCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutAccountsInput>;
export const UserCreateWithoutAccountsInputObjectZodSchema = makeSchema();
