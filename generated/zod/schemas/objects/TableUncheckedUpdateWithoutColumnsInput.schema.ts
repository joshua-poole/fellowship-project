import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema as RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema } from './RowUncheckedUpdateManyWithoutTableNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  baseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  rows: z.lazy(() => RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema).optional()
}).strict();
export const TableUncheckedUpdateWithoutColumnsInputObjectSchema: z.ZodType<Prisma.TableUncheckedUpdateWithoutColumnsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedUpdateWithoutColumnsInput>;
export const TableUncheckedUpdateWithoutColumnsInputObjectZodSchema = makeSchema();
