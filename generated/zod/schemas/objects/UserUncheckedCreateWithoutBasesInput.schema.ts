import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableUncheckedCreateNestedManyWithoutUserInputObjectSchema as TableUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TableUncheckedCreateNestedManyWithoutUserInput.schema';
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
  tables: z.lazy(() => TableUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutBasesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBasesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutBasesInput>;
export const UserUncheckedCreateWithoutBasesInputObjectZodSchema = makeSchema();
