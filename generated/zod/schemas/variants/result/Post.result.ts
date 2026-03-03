import * as z from 'zod';
// prettier-ignore
export const PostResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    createdBy: z.unknown(),
    createdById: z.string()
}).strict();

export type PostResultType = z.infer<typeof PostResultSchema>;
