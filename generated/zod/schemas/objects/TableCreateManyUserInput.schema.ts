import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  baseId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const TableCreateManyUserInputObjectSchema: z.ZodType<Prisma.TableCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateManyUserInput>;
export const TableCreateManyUserInputObjectZodSchema = makeSchema();
