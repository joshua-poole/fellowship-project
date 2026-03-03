import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './ColumnWhereUniqueInput.schema';
import { ColumnUpdateWithoutTableInputObjectSchema as ColumnUpdateWithoutTableInputObjectSchema } from './ColumnUpdateWithoutTableInput.schema';
import { ColumnUncheckedUpdateWithoutTableInputObjectSchema as ColumnUncheckedUpdateWithoutTableInputObjectSchema } from './ColumnUncheckedUpdateWithoutTableInput.schema';
import { ColumnCreateWithoutTableInputObjectSchema as ColumnCreateWithoutTableInputObjectSchema } from './ColumnCreateWithoutTableInput.schema';
import { ColumnUncheckedCreateWithoutTableInputObjectSchema as ColumnUncheckedCreateWithoutTableInputObjectSchema } from './ColumnUncheckedCreateWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ColumnWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ColumnUpdateWithoutTableInputObjectSchema), z.lazy(() => ColumnUncheckedUpdateWithoutTableInputObjectSchema)]),
  create: z.union([z.lazy(() => ColumnCreateWithoutTableInputObjectSchema), z.lazy(() => ColumnUncheckedCreateWithoutTableInputObjectSchema)])
}).strict();
export const ColumnUpsertWithWhereUniqueWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnUpsertWithWhereUniqueWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUpsertWithWhereUniqueWithoutTableInput>;
export const ColumnUpsertWithWhereUniqueWithoutTableInputObjectZodSchema = makeSchema();
