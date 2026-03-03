import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowCreateWithoutTableInputObjectSchema as RowCreateWithoutTableInputObjectSchema } from './RowCreateWithoutTableInput.schema';
import { RowUncheckedCreateWithoutTableInputObjectSchema as RowUncheckedCreateWithoutTableInputObjectSchema } from './RowUncheckedCreateWithoutTableInput.schema';
import { RowCreateOrConnectWithoutTableInputObjectSchema as RowCreateOrConnectWithoutTableInputObjectSchema } from './RowCreateOrConnectWithoutTableInput.schema';
import { RowUpsertWithWhereUniqueWithoutTableInputObjectSchema as RowUpsertWithWhereUniqueWithoutTableInputObjectSchema } from './RowUpsertWithWhereUniqueWithoutTableInput.schema';
import { RowCreateManyTableInputEnvelopeObjectSchema as RowCreateManyTableInputEnvelopeObjectSchema } from './RowCreateManyTableInputEnvelope.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './RowWhereUniqueInput.schema';
import { RowUpdateWithWhereUniqueWithoutTableInputObjectSchema as RowUpdateWithWhereUniqueWithoutTableInputObjectSchema } from './RowUpdateWithWhereUniqueWithoutTableInput.schema';
import { RowUpdateManyWithWhereWithoutTableInputObjectSchema as RowUpdateManyWithWhereWithoutTableInputObjectSchema } from './RowUpdateManyWithWhereWithoutTableInput.schema';
import { RowScalarWhereInputObjectSchema as RowScalarWhereInputObjectSchema } from './RowScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RowCreateWithoutTableInputObjectSchema), z.lazy(() => RowCreateWithoutTableInputObjectSchema).array(), z.lazy(() => RowUncheckedCreateWithoutTableInputObjectSchema), z.lazy(() => RowUncheckedCreateWithoutTableInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RowCreateOrConnectWithoutTableInputObjectSchema), z.lazy(() => RowCreateOrConnectWithoutTableInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RowUpsertWithWhereUniqueWithoutTableInputObjectSchema), z.lazy(() => RowUpsertWithWhereUniqueWithoutTableInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RowCreateManyTableInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => RowWhereUniqueInputObjectSchema), z.lazy(() => RowWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RowWhereUniqueInputObjectSchema), z.lazy(() => RowWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RowWhereUniqueInputObjectSchema), z.lazy(() => RowWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RowWhereUniqueInputObjectSchema), z.lazy(() => RowWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RowUpdateWithWhereUniqueWithoutTableInputObjectSchema), z.lazy(() => RowUpdateWithWhereUniqueWithoutTableInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RowUpdateManyWithWhereWithoutTableInputObjectSchema), z.lazy(() => RowUpdateManyWithWhereWithoutTableInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RowScalarWhereInputObjectSchema), z.lazy(() => RowScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RowUncheckedUpdateManyWithoutTableNestedInputObjectSchema: z.ZodType<Prisma.RowUncheckedUpdateManyWithoutTableNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUncheckedUpdateManyWithoutTableNestedInput>;
export const RowUncheckedUpdateManyWithoutTableNestedInputObjectZodSchema = makeSchema();
