import * as z from 'zod';
// prettier-ignore
export const TableInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    baseId: z.string(),
    base: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
    columns: z.array(z.unknown()),
    rows: z.array(z.unknown()),
    views: z.array(z.unknown())
}).strict();

export type TableInputType = z.infer<typeof TableInputSchema>;
