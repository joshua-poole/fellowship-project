import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TableCreateNestedOneWithoutRowsInputObjectSchema as TableCreateNestedOneWithoutRowsInputObjectSchema } from './TableCreateNestedOneWithoutRowsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  values: z.union([JsonNullValueInputSchema, jsonSchema]),
  table: z.lazy(() => TableCreateNestedOneWithoutRowsInputObjectSchema)
}).strict();
export const RowCreateInputObjectSchema: z.ZodType<Prisma.RowCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RowCreateInput>;
export const RowCreateInputObjectZodSchema = makeSchema();
