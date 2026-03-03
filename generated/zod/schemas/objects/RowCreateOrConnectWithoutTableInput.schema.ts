import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './RowWhereUniqueInput.schema';
import { RowCreateWithoutTableInputObjectSchema as RowCreateWithoutTableInputObjectSchema } from './RowCreateWithoutTableInput.schema';
import { RowUncheckedCreateWithoutTableInputObjectSchema as RowUncheckedCreateWithoutTableInputObjectSchema } from './RowUncheckedCreateWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RowWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RowCreateWithoutTableInputObjectSchema), z.lazy(() => RowUncheckedCreateWithoutTableInputObjectSchema)])
}).strict();
export const RowCreateOrConnectWithoutTableInputObjectSchema: z.ZodType<Prisma.RowCreateOrConnectWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowCreateOrConnectWithoutTableInput>;
export const RowCreateOrConnectWithoutTableInputObjectZodSchema = makeSchema();
