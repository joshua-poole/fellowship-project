import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  values: z.union([JsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const RowUncheckedUpdateManyWithoutTableInputObjectSchema: z.ZodType<Prisma.RowUncheckedUpdateManyWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUncheckedUpdateManyWithoutTableInput>;
export const RowUncheckedUpdateManyWithoutTableInputObjectZodSchema = makeSchema();
