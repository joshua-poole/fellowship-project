import * as z from 'zod';
// prettier-ignore
export const RowResultSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tableId: z.string(),
    table: z.unknown(),
    values: z.unknown()
}).strict();

export type RowResultType = z.infer<typeof RowResultSchema>;
