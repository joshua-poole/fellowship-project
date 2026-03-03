import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  tableId: z.string(),
  values: z.union([JsonNullValueInputSchema, jsonSchema])
}).strict();
export const RowUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RowUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUncheckedCreateInput>;
export const RowUncheckedCreateInputObjectZodSchema = makeSchema();
