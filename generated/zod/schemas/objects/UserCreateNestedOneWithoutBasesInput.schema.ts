import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateWithoutBasesInputObjectSchema as UserCreateWithoutBasesInputObjectSchema } from './UserCreateWithoutBasesInput.schema';
import { UserUncheckedCreateWithoutBasesInputObjectSchema as UserUncheckedCreateWithoutBasesInputObjectSchema } from './UserUncheckedCreateWithoutBasesInput.schema';
import { UserCreateOrConnectWithoutBasesInputObjectSchema as UserCreateOrConnectWithoutBasesInputObjectSchema } from './UserCreateOrConnectWithoutBasesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBasesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBasesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutBasesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBasesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutBasesInput>;
export const UserCreateNestedOneWithoutBasesInputObjectZodSchema = makeSchema();
