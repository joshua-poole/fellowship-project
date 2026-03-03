import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowCreateManyTableInputObjectSchema as RowCreateManyTableInputObjectSchema } from './RowCreateManyTableInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => RowCreateManyTableInputObjectSchema), z.lazy(() => RowCreateManyTableInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const RowCreateManyTableInputEnvelopeObjectSchema: z.ZodType<Prisma.RowCreateManyTableInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.RowCreateManyTableInputEnvelope>;
export const RowCreateManyTableInputEnvelopeObjectZodSchema = makeSchema();
