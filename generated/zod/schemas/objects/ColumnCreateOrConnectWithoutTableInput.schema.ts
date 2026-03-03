import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './ColumnWhereUniqueInput.schema';
import { ColumnCreateWithoutTableInputObjectSchema as ColumnCreateWithoutTableInputObjectSchema } from './ColumnCreateWithoutTableInput.schema';
import { ColumnUncheckedCreateWithoutTableInputObjectSchema as ColumnUncheckedCreateWithoutTableInputObjectSchema } from './ColumnUncheckedCreateWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ColumnWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ColumnCreateWithoutTableInputObjectSchema), z.lazy(() => ColumnUncheckedCreateWithoutTableInputObjectSchema)])
}).strict();
export const ColumnCreateOrConnectWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnCreateOrConnectWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnCreateOrConnectWithoutTableInput>;
export const ColumnCreateOrConnectWithoutTableInputObjectZodSchema = makeSchema();
