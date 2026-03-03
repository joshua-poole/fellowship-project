import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const RowWhereUniqueInputObjectSchema: z.ZodType<Prisma.RowWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.RowWhereUniqueInput>;
export const RowWhereUniqueInputObjectZodSchema = makeSchema();
