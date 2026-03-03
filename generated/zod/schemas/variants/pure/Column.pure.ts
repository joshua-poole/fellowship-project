import * as z from 'zod';
import { ColumnTypeSchema } from '../../enums/ColumnType.schema';
// prettier-ignore
export const ColumnModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: ColumnTypeSchema,
    description: z.string().nullable(),
    default: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tableId: z.string(),
    table: z.unknown()
}).strict();

export type ColumnPureType = z.infer<typeof ColumnModelSchema>;
