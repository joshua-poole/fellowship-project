import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema as ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './ColumnUncheckedUpdateManyWithoutTableNestedInput.schema';
import { RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema as RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './RowUncheckedUpdateManyWithoutTableNestedInput.schema';
import { ViewUncheckedUpdateManyWithoutTableNestedInputObjectSchema as ViewUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './ViewUncheckedUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  baseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  columns: z.lazy(() => ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional(),
  rows: z.lazy(() => RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional(),
  views: z.lazy(() => ViewUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.TableUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedUpdateInput>;
export const TableUncheckedUpdateInputObjectZodSchema = makeSchema();
