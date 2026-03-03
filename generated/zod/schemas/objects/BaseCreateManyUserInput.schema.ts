import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const BaseCreateManyUserInputObjectSchema: z.ZodType<Prisma.BaseCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateManyUserInput>;
export const BaseCreateManyUserInputObjectZodSchema = makeSchema();
