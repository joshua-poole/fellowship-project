import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TableOrderByWithRelationInputObjectSchema as TableOrderByWithRelationInputObjectSchema } from './TableOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  default: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  tableId: SortOrderSchema.optional(),
  table: z.lazy(() => TableOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ColumnOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ColumnOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnOrderByWithRelationInput>;
export const ColumnOrderByWithRelationInputObjectZodSchema = makeSchema();
