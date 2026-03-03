import * as z from 'zod';
// prettier-ignore
export const BaseModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    tables: z.array(z.unknown()),
    userId: z.string(),
    user: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type BasePureType = z.infer<typeof BaseModelSchema>;
