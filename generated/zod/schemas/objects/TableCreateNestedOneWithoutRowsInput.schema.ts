import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { TableCreateWithoutRowsInputObjectSchema as TableCreateWithoutRowsInputObjectSchema } from './TableCreateWithoutRowsInput.schema';
import { TableUncheckedCreateWithoutRowsInputObjectSchema as TableUncheckedCreateWithoutRowsInputObjectSchema } from './TableUncheckedCreateWithoutRowsInput.schema';
import { TableCreateOrConnectWithoutRowsInputObjectSchema as TableCreateOrConnectWithoutRowsInputObjectSchema } from './TableCreateOrConnectWithoutRowsInput.schema';
import { TableWhereUniqueInputObjectSchema as TableWhereUniqueInputObjectSchema } from './TableWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TableCreateWithoutRowsInputObjectSchema), z.lazy(() => TableUncheckedCreateWithoutRowsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => TableCreateOrConnectWithoutRowsInputObjectSchema).optional(),
  connect: z.lazy(() => TableWhereUniqueInputObjectSchema).optional()
}).strict();
export const TableCreateNestedOneWithoutRowsInputObjectSchema: z.ZodType<Prisma.TableCreateNestedOneWithoutRowsInput> = makeSchema() as unknown as z.ZodType<Prisma.TableCreateNestedOneWithoutRowsInput>;
export const TableCreateNestedOneWithoutRowsInputObjectZodSchema = makeSchema();
