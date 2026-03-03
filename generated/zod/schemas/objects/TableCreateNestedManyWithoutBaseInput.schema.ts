import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutBaseInputObjectSchema as TableCreateWithoutBaseInputObjectSchema } from './TableCreateWithoutBaseInput.schema';
import { TableUncheckedCreateWithoutBaseInputObjectSchema as TableUncheckedCreateWithoutBaseInputObjectSchema } from './TableUncheckedCreateWithoutBaseInput.schema';
import { TableCreateOrConnectWithoutBaseInputObjectSchema as TableCreateOrConnectWithoutBaseInputObjectSchema } from './TableCreateOrConnectWithoutBaseInput.schema';
import { TableCreateManyBaseInputEnvelopeObjectSchema as TableCreateManyBaseInputEnvelopeObjectSchema } from './TableCreateManyBaseInputEnvelope.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutBaseInputObjectSchema), z.lazy(() => TableCreateWithoutBaseInputObjectSchema).array(), z.lazy(() => TableUncheckedCreateWithoutBaseInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutBaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TableCreateOrConnectWithoutBaseInputObjectSchema), z.lazy(() => TableCreateOrConnectWithoutBaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TableCreateManyBaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const TableCreateNestedManyWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableCreateNestedManyWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateNestedManyWithoutBaseInput>;
export const TableCreateNestedManyWithoutBaseInputObjectZodSchema = makeSchema();
