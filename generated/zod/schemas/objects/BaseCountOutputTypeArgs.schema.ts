import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCountOutputTypeSelectObjectSchema as BaseCountOutputTypeSelectObjectSchema } from './BaseCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BaseCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const BaseCountOutputTypeArgsObjectSchema = makeSchema();
export const BaseCountOutputTypeArgsObjectZodSchema = makeSchema();
