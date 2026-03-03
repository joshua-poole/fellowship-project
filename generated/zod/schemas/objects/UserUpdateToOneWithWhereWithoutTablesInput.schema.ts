import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutTablesInputObjectSchema as UserUpdateWithoutTablesInputObjectSchema } from './UserUpdateWithoutTablesInput.schema';
import { UserUncheckedUpdateWithoutTablesInputObjectSchema as UserUncheckedUpdateWithoutTablesInputObjectSchema } from './UserUncheckedUpdateWithoutTablesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutTablesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTablesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutTablesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTablesInput>;
export const UserUpdateToOneWithWhereWithoutTablesInputObjectZodSchema = makeSchema();
