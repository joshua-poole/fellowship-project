import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableScalarWhereInputObjectSchema as TableScalarWhereInputObjectSchema } from './TableScalarWhereInput.schema';
import { TableUpdateManyMutationInputObjectSchema as TableUpdateManyMutationInputObjectSchema } from './TableUpdateManyMutationInput.schema';
import { TableUncheckedUpdateManyWithoutBaseInputObjectSchema as TableUncheckedUpdateManyWithoutBaseInputObjectSchema } from './TableUncheckedUpdateManyWithoutBaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TableScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => TableUpdateManyMutationInputObjectSchema), z.lazy(() => TableUncheckedUpdateManyWithoutBaseInputObjectSchema)])
}).strict();
export const TableUpdateManyWithWhereWithoutBaseInputObjectSchema: z.ZodType<Prisma.TableUpdateManyWithWhereWithoutBaseInput> = makeSchema() as unknown as z.ZodType<Prisma.TableUpdateManyWithWhereWithoutBaseInput>;
export const TableUpdateManyWithWhereWithoutBaseInputObjectZodSchema = makeSchema();
