import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  baseId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const TableMaxAggregateInputObjectSchema: z.ZodType<Prisma.TableMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.TableMaxAggregateInputType>;
export const TableMaxAggregateInputObjectZodSchema = makeSchema();
