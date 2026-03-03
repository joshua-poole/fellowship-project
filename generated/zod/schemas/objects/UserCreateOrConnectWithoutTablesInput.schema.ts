import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutTablesInputObjectSchema as UserCreateWithoutTablesInputObjectSchema } from './UserCreateWithoutTablesInput.schema';
import { UserUncheckedCreateWithoutTablesInputObjectSchema as UserUncheckedCreateWithoutTablesInputObjectSchema } from './UserUncheckedCreateWithoutTablesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTablesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutTablesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutTablesInput>;
export const UserCreateOrConnectWithoutTablesInputObjectZodSchema = makeSchema();
