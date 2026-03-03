import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateManyUserInputObjectSchema as BaseCreateManyUserInputObjectSchema } from './BaseCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => BaseCreateManyUserInputObjectSchema), z.lazy(() => BaseCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const BaseCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.BaseCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateManyUserInputEnvelope>;
export const BaseCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
