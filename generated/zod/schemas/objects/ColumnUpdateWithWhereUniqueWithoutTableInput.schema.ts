import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnWhereUniqueInputObjectSchema as ColumnWhereUniqueInputObjectSchema } from './ColumnWhereUniqueInput.schema';
import { ColumnUpdateWithoutTableInputObjectSchema as ColumnUpdateWithoutTableInputObjectSchema } from './ColumnUpdateWithoutTableInput.schema';
import { ColumnUncheckedUpdateWithoutTableInputObjectSchema as ColumnUncheckedUpdateWithoutTableInputObjectSchema } from './ColumnUncheckedUpdateWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ColumnWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ColumnUpdateWithoutTableInputObjectSchema), z.lazy(() => ColumnUncheckedUpdateWithoutTableInputObjectSchema)])
}).strict();
export const ColumnUpdateWithWhereUniqueWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnUpdateWithWhereUniqueWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUpdateWithWhereUniqueWithoutTableInput>;
export const ColumnUpdateWithWhereUniqueWithoutTableInputObjectZodSchema = makeSchema();
