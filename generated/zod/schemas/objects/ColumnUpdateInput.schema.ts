import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ColumnTypeSchema } from '../enums/ColumnType.schema';
import { EnumColumnTypeFieldUpdateOperationsInputObjectSchema as EnumColumnTypeFieldUpdateOperationsInputObjectSchema } from './EnumColumnTypeFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema as TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema } from './TableUpdateOneRequiredWithoutColumnsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([ColumnTypeSchema, z.lazy(() => EnumColumnTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  order: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  defaultValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  table: z.lazy(() => TableUpdateOneRequiredWithoutColumnsNestedInputObjectSchema).optional()
}).strict();
export const ColumnUpdateInputObjectSchema: z.ZodType<Prisma.ColumnUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUpdateInput>;
export const ColumnUpdateInputObjectZodSchema = makeSchema();
