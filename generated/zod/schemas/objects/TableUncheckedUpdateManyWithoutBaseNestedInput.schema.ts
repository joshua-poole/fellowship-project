import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutBaseInputObjectSchema as TableCreateWithoutBaseInputObjectSchema } from './TableCreateWithoutBaseInput.schema';
import { TableUncheckedCreateWithoutBaseInputObjectSchema as TableUncheckedCreateWithoutBaseInputObjectSchema } from './TableUncheckedCreateWithoutBaseInput.schema';
import { TableCreateOrConnectWithoutBaseInputObjectSchema as TableCreateOrConnectWithoutBaseInputObjectSchema } from './TableCreateOrConnectWithoutBaseInput.schema';
import { TableUpsertWithWhereUniqueWithoutBaseInputObjectSchema as TableUpsertWithWhereUniqueWithoutBaseInputObjectSchema } from './TableUpsertWithWhereUniqueWithoutBaseInput.schema';
import { TableCreateManyBaseInputEnvelopeObjectSchema as TableCreateManyBaseInputEnvelopeObjectSchema } from './TableCreateManyBaseInputEnvelope.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema';
import { TableUpdateWithWhereUniqueWithoutBaseInputObjectSchema as TableUpdateWithWhereUniqueWithoutBaseInputObjectSchema } from './TableUpdateWithWhereUniqueWithoutBaseInput.schema';
import { TableUpdateManyWithWhereWithoutBaseInputObjectSchema as TableUpdateManyWithWhereWithoutBaseInputObjectSchema } from './TableUpdateManyWithWhereWithoutBaseInput.schema';
import { TableScalarWhereInputObjectSchema as TableScalarWhereInputObjectSchema } from './TableScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutBaseInputObjectSchema), z.lazy(() => TableCreateWithoutBaseInputObjectSchema).array(), z.lazy(() => TableUncheckedCreateWithoutBaseInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutBaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TableCreateOrConnectWithoutBaseInputObjectSchema), z.lazy(() => TableCreateOrConnectWithoutBaseInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TableUpsertWithWhereUniqueWithoutBaseInputObjectSchema), z.lazy(() => TableUpsertWithWhereUniqueWithoutBaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TableCreateManyBaseInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TableWhereUniqueInputObjectSchema), z.lazy(() => TableWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TableUpdateWithWhereUniqueWithoutBaseInputObjectSchema), z.lazy(() => TableUpdateWithWhereUniqueWithoutBaseInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TableUpdateManyWithWhereWithoutBaseInputObjectSchema), z.lazy(() => TableUpdateManyWithWhereWithoutBaseInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TableScalarWhereInputObjectSchema), z.lazy(() => TableScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TableUncheckedUpdateManyWithoutBaseNestedInputObjectSchema: z.ZodType<Prisma.TableUncheckedUpdateManyWithoutBaseNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUncheckedUpdateManyWithoutBaseNestedInput>;
export const TableUncheckedUpdateManyWithoutBaseNestedInputObjectZodSchema = makeSchema();
