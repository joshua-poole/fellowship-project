import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema as BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './BaseUncheckedCreateNestedManyWithoutUserInput.schema';
import { TableUncheckedCreateNestedManyWithoutUserInputObjectSchema as TableUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TableUncheckedCreateNestedManyWithoutUserInput.schema';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bases: z.lazy(() => BaseUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  tables: z.lazy(() => TableUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput>;
export const UserUncheckedCreateWithoutAccountsInputObjectZodSchema = makeSchema();
