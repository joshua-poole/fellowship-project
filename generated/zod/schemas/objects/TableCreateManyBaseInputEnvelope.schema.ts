import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateManyBaseInputObjectSchema as TableCreateManyBaseInputObjectSchema } from './TableCreateManyBaseInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => TableCreateManyBaseInputObjectSchema), z.lazy(() => TableCreateManyBaseInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const TableCreateManyBaseInputEnvelopeObjectSchema: z.ZodType<Prisma.TableCreateManyBaseInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateManyBaseInputEnvelope>;
export const TableCreateManyBaseInputEnvelopeObjectZodSchema = makeSchema();
