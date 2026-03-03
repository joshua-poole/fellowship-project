import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateNestedManyWithoutBaseInputObjectSchema as TableCreateNestedManyWithoutBaseInputObjectSchema } from './TableCreateNestedManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tables: z.lazy(() => TableCreateNestedManyWithoutBaseInputObjectSchema).optional()
}).strict();
export const BaseCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateWithoutUserInput>;
export const BaseCreateWithoutUserInputObjectZodSchema = makeSchema();
