import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserUpdateWithoutBasesInputObjectSchema as UserUpdateWithoutBasesInputObjectSchema } from './UserUpdateWithoutBasesInput.schema';
import { UserUncheckedUpdateWithoutBasesInputObjectSchema as UserUncheckedUpdateWithoutBasesInputObjectSchema } from './UserUncheckedUpdateWithoutBasesInput.schema';
import { UserCreateWithoutBasesInputObjectSchema as UserCreateWithoutBasesInputObjectSchema } from './UserCreateWithoutBasesInput.schema';
import { UserUncheckedCreateWithoutBasesInputObjectSchema as UserUncheckedCreateWithoutBasesInputObjectSchema } from './UserUncheckedCreateWithoutBasesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBasesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBasesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutBasesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutBasesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutBasesInput>;
export const UserUpsertWithoutBasesInputObjectZodSchema = makeSchema();
