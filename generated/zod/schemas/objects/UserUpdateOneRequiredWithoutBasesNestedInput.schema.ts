import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateWithoutBasesInputObjectSchema as UserCreateWithoutBasesInputObjectSchema } from './UserCreateWithoutBasesInput.schema';
import { UserUncheckedCreateWithoutBasesInputObjectSchema as UserUncheckedCreateWithoutBasesInputObjectSchema } from './UserUncheckedCreateWithoutBasesInput.schema';
import { UserCreateOrConnectWithoutBasesInputObjectSchema as UserCreateOrConnectWithoutBasesInputObjectSchema } from './UserCreateOrConnectWithoutBasesInput.schema';
import { UserUpsertWithoutBasesInputObjectSchema as UserUpsertWithoutBasesInputObjectSchema } from './UserUpsertWithoutBasesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutBasesInputObjectSchema as UserUpdateToOneWithWhereWithoutBasesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutBasesInput.schema';
import { UserUpdateWithoutBasesInputObjectSchema as UserUpdateWithoutBasesInputObjectSchema } from './UserUpdateWithoutBasesInput.schema';
import { UserUncheckedUpdateWithoutBasesInputObjectSchema as UserUncheckedUpdateWithoutBasesInputObjectSchema } from './UserUncheckedUpdateWithoutBasesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBasesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBasesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutBasesInputObjectSchema), z.lazy(() => UserUpdateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBasesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutBasesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBasesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutBasesNestedInput>;
export const UserUpdateOneRequiredWithoutBasesNestedInputObjectZodSchema = makeSchema();
