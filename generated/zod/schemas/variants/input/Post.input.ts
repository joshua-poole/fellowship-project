import * as z from 'zod';
// prettier-ignore
export const PostInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    createdBy: z.unknown(),
    createdById: z.string()
}).strict();

export type PostInputType = z.infer<typeof PostInputSchema>;
