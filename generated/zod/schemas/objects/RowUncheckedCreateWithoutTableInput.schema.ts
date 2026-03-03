import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  values: z.union([JsonNullValueInputSchema, jsonSchema])
}).strict();
export const RowUncheckedCreateWithoutTableInputObjectSchema: z.ZodType<Prisma.RowUncheckedCreateWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUncheckedCreateWithoutTableInput>;
export const RowUncheckedCreateWithoutTableInputObjectZodSchema = makeSchema();
