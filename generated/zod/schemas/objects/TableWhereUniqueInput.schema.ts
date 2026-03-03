import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const TableWhereUniqueInputObjectSchema: z.ZodType<Prisma.TableWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.TableWhereUniqueInput>;
export const TableWhereUniqueInputObjectZodSchema = makeSchema();
