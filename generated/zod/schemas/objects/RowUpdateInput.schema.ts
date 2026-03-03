import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TableUpdateOneRequiredWithoutRowsNestedInputObjectSchema as TableUpdateOneRequiredWithoutRowsNestedInputObjectSchema } from './TableUpdateOneRequiredWithoutRowsNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  values: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  table: z.lazy(() => TableUpdateOneRequiredWithoutRowsNestedInputObjectSchema).optional()
}).strict();
export const RowUpdateInputObjectSchema: z.ZodType<Prisma.RowUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUpdateInput>;
export const RowUpdateInputObjectZodSchema = makeSchema();
