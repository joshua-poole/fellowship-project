import * as z from 'zod';
// prettier-ignore
export const RowModelSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tableId: z.string(),
    table: z.unknown(),
    values: z.unknown()
}).strict();

export type RowPureType = z.infer<typeof RowModelSchema>;
