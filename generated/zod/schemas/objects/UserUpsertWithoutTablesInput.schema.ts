import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserUpdateWithoutTablesInputObjectSchema as UserUpdateWithoutTablesInputObjectSchema } from './UserUpdateWithoutTablesInput.schema';
import { UserUncheckedUpdateWithoutTablesInputObjectSchema as UserUncheckedUpdateWithoutTablesInputObjectSchema } from './UserUncheckedUpdateWithoutTablesInput.schema';
import { UserCreateWithoutTablesInputObjectSchema as UserCreateWithoutTablesInputObjectSchema } from './UserCreateWithoutTablesInput.schema';
import { UserUncheckedCreateWithoutTablesInputObjectSchema as UserUncheckedCreateWithoutTablesInputObjectSchema } from './UserUncheckedCreateWithoutTablesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTablesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTablesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutTablesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutTablesInput>;
export const UserUpsertWithoutTablesInputObjectZodSchema = makeSchema();
