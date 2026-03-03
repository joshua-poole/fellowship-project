import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutBasesInputObjectSchema as UserCreateWithoutBasesInputObjectSchema } from './UserCreateWithoutBasesInput.schema';
import { UserUncheckedCreateWithoutBasesInputObjectSchema as UserUncheckedCreateWithoutBasesInputObjectSchema } from './UserUncheckedCreateWithoutBasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBasesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutBasesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBasesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutBasesInput>;
export const UserCreateOrConnectWithoutBasesInputObjectZodSchema = makeSchema();
