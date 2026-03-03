import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseUpdateWithoutTablesInputObjectSchema as BaseUpdateWithoutTablesInputObjectSchema } from './BaseUpdateWithoutTablesInput.schema';
import { BaseUncheckedUpdateWithoutTablesInputObjectSchema as BaseUncheckedUpdateWithoutTablesInputObjectSchema } from './BaseUncheckedUpdateWithoutTablesInput.schema';
import { BaseCreateWithoutTablesInputObjectSchema as BaseCreateWithoutTablesInputObjectSchema } from './BaseCreateWithoutTablesInput.schema';
import { BaseUncheckedCreateWithoutTablesInputObjectSchema as BaseUncheckedCreateWithoutTablesInputObjectSchema } from './BaseUncheckedCreateWithoutTablesInput.schema';
import { BaseWhereInputObjectSchema as BaseWhereInputObjectSchema } from './BaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => BaseUpdateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutTablesInputObjectSchema)]),
  create: z.union([z.lazy(() => BaseCreateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutTablesInputObjectSchema)]),
  where: z.lazy(() => BaseWhereInputObjectSchema).optional()
}).strict();
export const BaseUpsertWithoutTablesInputObjectSchema: z.ZodType<Prisma.BaseUpsertWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpsertWithoutTablesInput>;
export const BaseUpsertWithoutTablesInputObjectZodSchema = makeSchema();
