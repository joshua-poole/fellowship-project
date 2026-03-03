import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema as BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema } from './BaseUpdateOneRequiredWithoutTablesNestedInput.schema';
import { RowUpdateManyWithoutTableNestedInputObjectSchema as RowUpdateManyWithoutTableNestedInputObjectSchema } from './RowUpdateManyWithoutTableNestedInput.schema';
import { ViewUpdateManyWithoutTableNestedInputObjectSchema as ViewUpdateManyWithoutTableNestedInputObjectSchema } from './ViewUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  base: z.lazy(() => BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema).optional(),
  rows: z.lazy(() => RowUpdateManyWithoutTableNestedInputObjectSchema).optional(),
  views: z.lazy(() => ViewUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUpdateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUpdateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateWithoutColumnsInput>;
export const TableUpdateWithoutColumnsInputObjectZodSchema = makeSchema();
