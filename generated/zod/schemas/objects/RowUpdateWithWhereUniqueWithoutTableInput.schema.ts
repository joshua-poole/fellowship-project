import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowWhereUniqueInputObjectSchema as RowWhereUniqueInputObjectSchema } from './RowWhereUniqueInput.schema';
import { RowUpdateWithoutTableInputObjectSchema as RowUpdateWithoutTableInputObjectSchema } from './RowUpdateWithoutTableInput.schema';
import { RowUncheckedUpdateWithoutTableInputObjectSchema as RowUncheckedUpdateWithoutTableInputObjectSchema } from './RowUncheckedUpdateWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RowWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RowUpdateWithoutTableInputObjectSchema), z.lazy(() => RowUncheckedUpdateWithoutTableInputObjectSchema)])
}).strict();
export const RowUpdateWithWhereUniqueWithoutTableInputObjectSchema: z.ZodType<Prisma.RowUpdateWithWhereUniqueWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUpdateWithWhereUniqueWithoutTableInput>;
export const RowUpdateWithWhereUniqueWithoutTableInputObjectZodSchema = makeSchema();
