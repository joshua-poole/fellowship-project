import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableScalarWhereInputObjectSchema as TableScalarWhereInputObjectSchema } from './TableScalarWhereInput.schema';
import { TableUpdateManyMutationInputObjectSchema as TableUpdateManyMutationInputObjectSchema } from './TableUpdateManyMutationInput.schema';
import { TableUncheckedUpdateManyWithoutUserInputObjectSchema as TableUncheckedUpdateManyWithoutUserInputObjectSchema } from './TableUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TableUpdateManyMutationInputObjectSchema), z.lazy(() => TableUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const TableUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.TableUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateManyWithWhereWithoutUserInput>;
export const TableUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
