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
export const TableMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.TableMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.TableMaxOrderByAggregateInput>;
export const TableMaxOrderByAggregateInputObjectZodSchema = makeSchema();
