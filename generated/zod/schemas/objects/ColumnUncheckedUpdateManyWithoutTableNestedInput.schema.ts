import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnCreateWithoutTableInputObjectSchema as ColumnCreateWithoutTableInputObjectSchema } from './ColumnCreateWithoutTableInput.schema';
import { ColumnUncheckedCreateWithoutTableInputObjectSchema as ColumnUncheckedCreateWithoutTableInputObjectSchema } from './ColumnUncheckedCreateWithoutTableInput.schema';
import { ColumnCreateOrConnectWithoutTableInputObjectSchema as ColumnCreateOrConnectWithoutTableInputObjectSchema } from './ColumnCreateOrConnectWithoutTableInput.schema';
import { ColumnUpsertWithWhereUniqueWithoutTableInputObjectSchema as ColumnUpsertWithWhereUniqueWithoutTableInputObjectSchema } from './ColumnUpsertWithWhereUniqueWithoutTableInput.schema';
import { ColumnCreateManyTableInputEnvelopeObjectSchema as ColumnCreateManyTableInputEnvelopeObjectSchema } from './ColumnCreateManyTableInputEnvelope.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './ColumnWhereUniqueInput.schema';
import { ColumnUpdateWithWhereUniqueWithoutTableInputObjectSchema as ColumnUpdateWithWhereUniqueWithoutTableInputObjectSchema } from './ColumnUpdateWithWhereUniqueWithoutTableInput.schema';
import { ColumnUpdateManyWithWhereWithoutTableInputObjectSchema as ColumnUpdateManyWithWhereWithoutTableInputObjectSchema } from './ColumnUpdateManyWithWhereWithoutTableInput.schema';
import { ColumnScalarWhereInputObjectSchema as ColumnScalarWhereInputObjectSchema } from './ColumnScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ColumnCreateWithoutTableInputObjectSchema), z.lazy(() => ColumnCreateWithoutTableInputObjectSchema).array(), z.lazy(() => ColumnUncheckedCreateWithoutTableInputObjectSchema), z.lazy(() => ColumnUncheckedCreateWithoutTableInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ColumnCreateOrConnectWithoutTableInputObjectSchema), z.lazy(() => ColumnCreateOrConnectWithoutTableInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ColumnUpsertWithWhereUniqueWithoutTableInputObjectSchema), z.lazy(() => ColumnUpsertWithWhereUniqueWithoutTableInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ColumnCreateManyTableInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ColumnWhereUniqueInputObjectSchema), z.lazy(() => ColumnWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ColumnWhereUniqueInputObjectSchema), z.lazy(() => ColumnWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ColumnWhereUniqueInputObjectSchema), z.lazy(() => ColumnWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ColumnWhereUniqueInputObjectSchema), z.lazy(() => ColumnWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ColumnUpdateWithWhereUniqueWithoutTableInputObjectSchema), z.lazy(() => ColumnUpdateWithWhereUniqueWithoutTableInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ColumnUpdateManyWithWhereWithoutTableInputObjectSchema), z.lazy(() => ColumnUpdateManyWithWhereWithoutTableInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ColumnScalarWhereInputObjectSchema), z.lazy(() => ColumnScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ColumnUncheckedUpdateManyWithoutTableNestedInputObjectSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyWithoutTableNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUncheckedUpdateManyWithoutTableNestedInput>;
export const ColumnUncheckedUpdateManyWithoutTableNestedInputObjectZodSchema = makeSchema();
