import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnCreateWithoutTableInputObjectSchema as ColumnCreateWithoutTableInputObjectSchema } from './ColumnCreateWithoutTableInput.schema';
import { ColumnUncheckedCreateWithoutTableInputObjectSchema as ColumnUncheckedCreateWithoutTableInputObjectSchema } from './ColumnUncheckedCreateWithoutTableInput.schema';
import { ColumnCreateOrConnectWithoutTableInputObjectSchema as ColumnCreateOrConnectWithoutTableInputObjectSchema } from './ColumnCreateOrConnectWithoutTableInput.schema';
import { ColumnCreateManyTableInputEnvelopeObjectSchema as ColumnCreateManyTableInputEnvelopeObjectSchema } from './ColumnCreateManyTableInputEnvelope.schema';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './ColumnWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ColumnCreateWithoutTableInputObjectSchema), z.lazy(() => ColumnCreateWithoutTableInputObjectSchema).array(), z.lazy(() => ColumnUncheckedCreateWithoutTableInputObjectSchema), z.lazy(() => ColumnUncheckedCreateWithoutTableInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ColumnCreateOrConnectWithoutTableInputObjectSchema), z.lazy(() => ColumnCreateOrConnectWithoutTableInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ColumnCreateManyTableInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ColumnWhereUniqueInputObjectSchema), z.lazy(() => ColumnWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ColumnUncheckedCreateNestedManyWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnUncheckedCreateNestedManyWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUncheckedCreateNestedManyWithoutTableInput>;
export const ColumnUncheckedCreateNestedManyWithoutTableInputObjectZodSchema = makeSchema();
