import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateWithoutTablesInputObjectSchema as UserCreateWithoutTablesInputObjectSchema } from './UserCreateWithoutTablesInput.schema';
import { UserUncheckedCreateWithoutTablesInputObjectSchema as UserUncheckedCreateWithoutTablesInputObjectSchema } from './UserUncheckedCreateWithoutTablesInput.schema';
import { UserCreateOrConnectWithoutTablesInputObjectSchema as UserCreateOrConnectWithoutTablesInputObjectSchema } from './UserCreateOrConnectWithoutTablesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTablesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTablesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutTablesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutTablesInput>;
export const UserCreateNestedOneWithoutTablesInputObjectZodSchema = makeSchema();
