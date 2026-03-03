import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RowScalarWhereInputObjectSchema as RowScalarWhereInputObjectSchema } from './RowScalarWhereInput.schema';
import { RowUpdateManyMutationInputObjectSchema as RowUpdateManyMutationInputObjectSchema } from './RowUpdateManyMutationInput.schema';
import { RowUncheckedUpdateManyWithoutTableInputObjectSchema as RowUncheckedUpdateManyWithoutTableInputObjectSchema } from './RowUncheckedUpdateManyWithoutTableInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RowScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RowUpdateManyMutationInputObjectSchema), z.lazy(() => RowUncheckedUpdateManyWithoutTableInputObjectSchema)])
}).strict();
export const RowUpdateManyWithWhereWithoutTableInputObjectSchema: z.ZodType<Prisma.RowUpdateManyWithWhereWithoutTableInput> = makeSchema() as unknown as z.ZodType<Prisma.RowUpdateManyWithWhereWithoutTableInput>;
export const RowUpdateManyWithWhereWithoutTableInputObjectZodSchema = makeSchema();
