import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './TableOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  values: SortOrderSchema.optional(),
  table: z.lazy(() => TableOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const RowOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RowOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RowOrderByWithRelationInput>;
export const RowOrderByWithRelationInputObjectZodSchema = makeSchema();
