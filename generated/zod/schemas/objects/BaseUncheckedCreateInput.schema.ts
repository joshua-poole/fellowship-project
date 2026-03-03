import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema as TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema } from './TableUncheckedCreateNestedManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  tables: z.lazy(() => TableUncheckedCreateNestedManyWithoutBaseInputObjectSchema).optional()
}).strict();
export const BaseUncheckedCreateInputObjectSchema: z.ZodType<Prisma.BaseUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUncheckedCreateInput>;
export const BaseUncheckedCreateInputObjectZodSchema = makeSchema();
