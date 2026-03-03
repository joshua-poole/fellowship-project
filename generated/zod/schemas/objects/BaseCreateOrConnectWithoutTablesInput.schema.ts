import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { BaseWhereUniqueInputObjectSchema as BaseWhereUniqueInputObjectSchema } from './BaseWhereUniqueInput.schema';
import { BaseCreateWithoutTablesInputObjectSchema as BaseCreateWithoutTablesInputObjectSchema } from './BaseCreateWithoutTablesInput.schema';
import { BaseUncheckedCreateWithoutTablesInputObjectSchema as BaseUncheckedCreateWithoutTablesInputObjectSchema } from './BaseUncheckedCreateWithoutTablesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BaseCreateWithoutTablesInputObjectSchema), z.lazy(() => BaseUncheckedCreateWithoutTablesInputObjectSchema)])
}).strict();
export const BaseCreateOrConnectWithoutTablesInputObjectSchema: z.ZodType<Prisma.BaseCreateOrConnectWithoutTablesInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateOrConnectWithoutTablesInput>;
export const BaseCreateOrConnectWithoutTablesInputObjectZodSchema = makeSchema();
