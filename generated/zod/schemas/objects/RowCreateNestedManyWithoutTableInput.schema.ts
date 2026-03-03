import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowCreateWithoutTableInputObjectSchema as RowCreateWithoutTableInputObjectSchema } from './RowCreateWithoutTableInput.schema';
import { RowUncheckedCreateWithoutTableInputObjectSchema as RowUncheckedCreateWithoutTableInputObjectSchema } from './RowUncheckedCreateWithoutTableInput.schema';
import { RowCreateOrConnectWithoutTableInputObjectSchema as RowCreateOrConnectWithoutTableInputObjectSchema } from './RowCreateOrConnectWithoutTableInput.schema';
import { RowCreateManyTableInputEnvelopeObjectSchema as RowCreateManyTableInputEnvelopeObjectSchema } from './RowCreateManyTableInputEnvelope.schema';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './RowWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RowCreateWithoutTableInputObjectSchema), z.lazy(() => RowCreateWithoutTableInputObjectSchema).array(), z.lazy(() => RowUncheckedCreateWithoutTableInputObjectSchema), z.lazy(() => RowUncheckedCreateWithoutTableInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RowCreateOrConnectWithoutTableInputObjectSchema), z.lazy(() => RowCreateOrConnectWithoutTableInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RowCreateManyTableInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => RowWhereUniqueInputObjectSchema), z.lazy(() => RowWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RowCreateNestedManyWithoutTableInputObjectSchema: z.ZodType<Prisma.RowCreateNestedManyWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowCreateNestedManyWithoutTableInput>;
export const RowCreateNestedManyWithoutTableInputObjectZodSchema = makeSchema();
