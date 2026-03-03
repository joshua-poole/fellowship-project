import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ColumnWhereUniqueInputObjectSchema: z.ZodType<Prisma.ColumnWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnWhereUniqueInput>;
export const ColumnWhereUniqueInputObjectZodSchema = makeSchema();
