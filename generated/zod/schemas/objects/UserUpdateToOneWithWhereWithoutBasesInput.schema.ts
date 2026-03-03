import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutBasesInputObjectSchema as UserUpdateWithoutBasesInputObjectSchema } from './UserUpdateWithoutBasesInput.schema';
import { UserUncheckedUpdateWithoutBasesInputObjectSchema as UserUncheckedUpdateWithoutBasesInputObjectSchema } from './UserUncheckedUpdateWithoutBasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutBasesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBasesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutBasesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBasesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBasesInput>;
export const UserUpdateToOneWithWhereWithoutBasesInputObjectZodSchema = makeSchema();
