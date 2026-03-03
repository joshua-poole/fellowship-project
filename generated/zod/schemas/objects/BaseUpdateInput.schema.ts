import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { TableUpdateManyWithoutBaseNestedInputObjectSchema as TableUpdateManyWithoutBaseNestedInputObjectSchema } from './TableUpdateManyWithoutBaseNestedInput.schema';
import { UserUpdateOneRequiredWithoutBasesNestedInputObjectSchema as UserUpdateOneRequiredWithoutBasesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutBasesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  tables: z.lazy(() => TableUpdateManyWithoutBaseNestedInputObjectSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBasesNestedInputObjectSchema).optional()
}).strict();
export const BaseUpdateInputObjectSchema: z.ZodType<Prisma.BaseUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateInput>;
export const BaseUpdateInputObjectZodSchema = makeSchema();
