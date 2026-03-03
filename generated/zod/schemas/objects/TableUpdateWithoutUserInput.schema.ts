import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema as BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema } from './BaseUpdateOneRequiredWithoutTablesNestedInput.schema';
import { ColumnUpdateManyWithoutTableNestedInputObjectSchema as ColumnUpdateManyWithoutTableNestedInputObjectSchema } from './ColumnUpdateManyWithoutTableNestedInput.schema';
import { RowUpdateManyWithoutTableNestedInputObjectSchema as RowUpdateManyWithoutTableNestedInputObjectSchema } from './RowUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  base: z.lazy(() => BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema).optional(),
  columns: z.lazy(() => ColumnUpdateManyWithoutTableNestedInputObjectSchema).optional(),
  rows: z.lazy(() => RowUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.TableUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateWithoutUserInput>;
export const TableUpdateWithoutUserInputObjectZodSchema = makeSchema();
