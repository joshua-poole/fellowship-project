import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './BaseWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountBasesArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountBasesArgsObjectZodSchema = makeSchema();
