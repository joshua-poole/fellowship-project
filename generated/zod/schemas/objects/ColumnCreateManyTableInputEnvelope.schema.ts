import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnCreateManyTableInputObjectSchema as ColumnCreateManyTableInputObjectSchema } from './ColumnCreateManyTableInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ColumnCreateManyTableInputObjectSchema), z.lazy(() => ColumnCreateManyTableInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ColumnCreateManyTableInputEnvelopeObjectSchema: z.ZodType<Prisma.ColumnCreateManyTableInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ColumnCreateManyTableInputEnvelope>;
export const ColumnCreateManyTableInputEnvelopeObjectZodSchema = makeSchema();
