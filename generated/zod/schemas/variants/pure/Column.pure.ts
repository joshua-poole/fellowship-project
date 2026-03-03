import * as z from 'zod';
import { ColumnTypeSchema } from '../../enums/ColumnType.schema';
// prettier-ignore
export const ColumnModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: ColumnTypeSchema,
    order: z.number().int(),
    description: z.string().nullable(),
    defaultValue: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tableId: z.string(),
    table: z.unknown()
}).strict();

export type ColumnPureType = z.infer<typeof ColumnModelSchema>;
