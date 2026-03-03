import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  baseId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const TableMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TableMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableMinOrderByAggregateInput>;
export const TableMinOrderByAggregateInputObjectZodSchema = makeSchema();
