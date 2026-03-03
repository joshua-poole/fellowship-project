import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateManyUserInputObjectSchema as TableCreateManyUserInputObjectSchema } from './TableCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TableCreateManyUserInputObjectSchema), z.lazy(() => TableCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TableCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.TableCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateManyUserInputEnvelope>;
export const TableCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
