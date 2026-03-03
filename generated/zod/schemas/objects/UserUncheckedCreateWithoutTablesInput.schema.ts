import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema as BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './BaseUncheckedCreateNestedManyWithoutUserInput.schema';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bases: z.lazy(() => BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutTablesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutTablesInput>;
export const UserUncheckedCreateWithoutTablesInputObjectZodSchema = makeSchema();
