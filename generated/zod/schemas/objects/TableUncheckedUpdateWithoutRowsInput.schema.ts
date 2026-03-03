import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema as ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './ColumnUncheckedUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  baseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  columns: z.lazy(() => ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUncheckedUpdateWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableUncheckedUpdateWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedUpdateWithoutRowsInput>;
export const TableUncheckedUpdateWithoutRowsInputObjectZodSchema = makeSchema();
