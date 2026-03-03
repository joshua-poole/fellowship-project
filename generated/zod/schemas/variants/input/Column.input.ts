import * as z from 'zod';
import { ColumnTypeSchema } from '../../enums/ColumnType.schema';
// prettier-ignore
export const ColumnInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: ColumnTypeSchema,
    order: z.number().int(),
    description: z.string().optional().nullable(),
    defaultValue: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tableId: z.string(),
    table: z.unknown()
}).strict();

export type ColumnInputType = z.infer<typeof ColumnInputSchema>;
