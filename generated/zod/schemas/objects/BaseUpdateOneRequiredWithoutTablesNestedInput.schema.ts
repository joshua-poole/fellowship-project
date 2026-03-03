import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateWithoutTablesInputObjectSchema as BaseCreateWithoutTablesInputObjectSchema } from './BaseCreateWithoutTablesInput.schema';
import { BaseUncheckedCreateWithoutTablesInputObjectSchema as BaseUncheckedCreateWithoutTablesInputObjectSchema } from './BaseUncheckedCreateWithoutTablesInput.schema';
import { BaseCreateOrConnectWithoutTablesInputObjectSchema as BaseCreateOrConnectWithoutTablesInputObjectSchema } from './BaseCreateOrConnectWithoutTablesInput.schema';
import { BaseUpsertWithoutTablesInputObjectSchema as BaseUpsertWithoutTablesInputObjectSchema } from './BaseUpsertWithoutTablesInput.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseUpdateToOneWithWhereWithoutTablesInputObjectSchema as BaseUpdateToOneWithWhereWithoutTablesInputObjectSchema } from './BaseUpdateToOneWithWhereWithoutTablesInput.schema';
import { BaseUpdateWithoutTablesInputObjectSchema as BaseUpdateWithoutTablesInputObjectSchema } from './BaseUpdateWithoutTablesInput.schema';
import { BaseUncheckedUpdateWithoutTablesInputObjectSchema as BaseUncheckedUpdateWithoutTablesInputObjectSchema } from './BaseUncheckedUpdateWithoutTablesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BaseCreateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutTablesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BaseCreateOrConnectWithoutTablesInputObjectSchema).optional(),
  upsert: z.lazy(() => BaseUpsertWithoutTablesInputObjectSchema).optional(),
  connect: z.lazy(() => BaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BaseUpdateToOneWithWhereWithoutTablesInputObjectSchema), z.lazy(() => BaseUpdateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedUpdateWithoutTablesInputObjectSchema)]).optional()
}).strict();
export const BaseUpdateOneRequiredWithoutTablesNestedInputObjectSchema: z.ZodType<Prisma.BaseUpdateOneRequiredWithoutTablesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseUpdateOneRequiredWithoutTablesNestedInput>;
export const BaseUpdateOneRequiredWithoutTablesNestedInputObjectZodSchema = makeSchema();
