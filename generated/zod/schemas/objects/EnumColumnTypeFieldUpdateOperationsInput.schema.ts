import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnTypeSchema } from '../enums/ColumnType.schema'

const makeSchema = () => z.object({
  set: ColumnTypeSchema.optional()
}).strict();
export const EnumColumnTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumColumnTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumColumnTypeFieldUpdateOperationsInput>;
export const EnumColumnTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
