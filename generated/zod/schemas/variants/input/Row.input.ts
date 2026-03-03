import * as z from 'zod';
// prettier-ignore
export const RowInputSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tableId: z.string(),
    table: z.unknown(),
    values: z.unknown()
}).strict();

export type RowInputType = z.infer<typeof RowInputSchema>;
