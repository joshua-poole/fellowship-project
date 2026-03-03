import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateWithoutTablesInputObjectSchema as UserCreateWithoutTablesInputObjectSchema } from './UserCreateWithoutTablesInput.schema';
import { UserUncheckedCreateWithoutTablesInputObjectSchema as UserUncheckedCreateWithoutTablesInputObjectSchema } from './UserUncheckedCreateWithoutTablesInput.schema';
import { UserCreateOrConnectWithoutTablesInputObjectSchema as UserCreateOrConnectWithoutTablesInputObjectSchema } from './UserCreateOrConnectWithoutTablesInput.schema';
import { UserUpsertWithoutTablesInputObjectSchema as UserUpsertWithoutTablesInputObjectSchema } from './UserUpsertWithoutTablesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutTablesInputObjectSchema as UserUpdateToOneWithWhereWithoutTablesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutTablesInput.schema';
import { UserUpdateWithoutTablesInputObjectSchema as UserUpdateWithoutTablesInputObjectSchema } from './UserUpdateWithoutTablesInput.schema';
import { UserUncheckedUpdateWithoutTablesInputObjectSchema as UserUncheckedUpdateWithoutTablesInputObjectSchema } from './UserUncheckedUpdateWithoutTablesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTablesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTablesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTablesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTablesInputObjectSchema), z.lazy(() => UserUpdateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTablesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutTablesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTablesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutTablesNestedInput>;
export const UserUpdateOneRequiredWithoutTablesNestedInputObjectZodSchema = makeSchema();
