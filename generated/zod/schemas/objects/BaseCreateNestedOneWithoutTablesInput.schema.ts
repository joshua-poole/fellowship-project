import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseCreateWithoutTablesInputObjectSchema as BaseCreateWithoutTablesInputObjectSchema } from './BaseCreateWithoutTablesInput.schema';
import { BaseUncheckedCreateWithoutTablesInputObjectSchema as BaseUncheckedCreateWithoutTablesInputObjectSchema } from './BaseUncheckedCreateWithoutTablesInput.schema';
import { BaseCreateOrConnectWithoutTablesInputObjectSchema as BaseCreateOrConnectWithoutTablesInputObjectSchema } from './BaseCreateOrConnectWithoutTablesInput.schema';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BaseCreateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutTablesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BaseCreateOrConnectWithoutTablesInputObjectSchema).optional(),
  connect: z.lazy(() => BaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const BaseCreateNestedOneWithoutTablesInputObjectSchema: z.ZodType<Prisma.BaseCreateNestedOneWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateNestedOneWithoutTablesInput>;
export const BaseCreateNestedOneWithoutTablesInputObjectZodSchema = makeSchema();
