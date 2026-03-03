import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './RowWhereUniqueInput.schema';
import { RowUpdateWithoutTableInputObjectSchema as RowUpdateWithoutTableInputObjectSchema } from './RowUpdateWithoutTableInput.schema';
import { RowUncheckedUpdateWithoutTableInputObjectSchema as RowUncheckedUpdateWithoutTableInputObjectSchema } from './RowUncheckedUpdateWithoutTableInput.schema';
import { RowCreateWithoutTableInputObjectSchema as RowCreateWithoutTableInputObjectSchema } from './RowCreateWithoutTableInput.schema';
import { RowUncheckedCreateWithoutTableInputObjectSchema as RowUncheckedCreateWithoutTableInputObjectSchema } from './RowUncheckedCreateWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RowWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RowUpdateWithoutTableInputObjectSchema), z.lazy(() => RowUncheckedUpdateWithoutTableInputObjectSchema)]),
  create: z.union([z.lazy(() => RowCreateWithoutTableInputObjectSchema), z.lazy(() => RowUncheckedCreateWithoutTableInputObjectSchema)])
}).strict();
export const RowUpsertWithWhereUniqueWithoutTableInputObjectSchema: z.ZodType<Prisma.RowUpsertWithWhereUniqueWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUpsertWithWhereUniqueWithoutTableInput>;
export const RowUpsertWithWhereUniqueWithoutTableInputObjectZodSchema = makeSchema();
