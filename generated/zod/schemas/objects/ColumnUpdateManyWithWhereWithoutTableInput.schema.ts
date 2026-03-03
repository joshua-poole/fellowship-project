import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ColumnScalarWhereInputObjectSchema as ColumnScalarWhereInputObjectSchema } from './ColumnScalarWhereInput.schema';
import { ColumnUpdateManyMutationInputObjectSchema as ColumnUpdateManyMutationInputObjectSchema } from './ColumnUpdateManyMutationInput.schema';
import { ColumnUncheckedUpdateManyWithoutTableInputObjectSchema as ColumnUncheckedUpdateManyWithoutTableInputObjectSchema } from './ColumnUncheckedUpdateManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ColumnScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ColumnUpdateManyMutationInputObjectSchema), z.lazy(() => ColumnUncheckedUpdateManyWithoutTableInputObjectSchema)])
}).strict();
export const ColumnUpdateManyWithWhereWithoutTableInputObjectSchema: z.ZodType<Prisma.ColumnUpdateManyWithWhereWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.ColumnUpdateManyWithWhereWithoutTableInput>;
export const ColumnUpdateManyWithWhereWithoutTableInputObjectZodSchema = makeSchema();
