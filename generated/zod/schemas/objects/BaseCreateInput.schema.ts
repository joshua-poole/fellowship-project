import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateNestedManyWithoutBaseInputObjectSchema as TableCreateNestedManyWithoutBaseInputObjectSchema } from './TableCreateNestedManyWithoutBaseInput.schema';
import { UserCreateNestedOneWithoutBasesInputObjectSchema as UserCreateNestedOneWithoutBasesInputObjectSchema } from './UserCreateNestedOneWithoutBasesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  tables: z.lazy(() => TableCreateNestedManyWithoutBaseInputObjectSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBasesInputObjectSchema)
}).strict();
export const BaseCreateInputObjectSchema: z.ZodType<Prisma.BaseCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateInput>;
export const BaseCreateInputObjectZodSchema = makeSchema();
