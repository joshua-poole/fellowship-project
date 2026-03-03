import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './BaseWhereInput.schema';
import { BaseUpdateWithoutTablesInputObjectSchema as BaseUpdateWithoutTablesInputObjectSchema } from './BaseUpdateWithoutTablesInput.schema';
import { BaseUncheckedUpdateWithoutTablesInputObjectSchema as BaseUncheckedUpdateWithoutTablesInputObjectSchema } from './BaseUncheckedUpdateWithoutTablesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BaseUpdateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutTablesInputObjectSchema)])
}).strict();
export const BaseUpdateToOneWithWhereWithoutTablesInputObjectSchema: z.ZodType<Prisma.BaseUpdateToOneWithWhereWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateToOneWithWhereWithoutTablesInput>;
export const BaseUpdateToOneWithWhereWithoutTablesInputObjectZodSchema = makeSchema();
