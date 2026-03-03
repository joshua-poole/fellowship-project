import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const BaseWhereUniqueInputObjectSchema: z.ZodType<Prisma.BaseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseWhereUniqueInput>;
export const BaseWhereUniqueInputObjectZodSchema = makeSchema();
