import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema as TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema } from './TableUncheckedCreateNestedManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tables: z.lazy(() => TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema).optional()
}).strict();
export const BaseUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.BaseUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedCreateWithoutUserInput>;
export const BaseUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
