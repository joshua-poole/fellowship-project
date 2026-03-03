import * as z from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    bases: z.array(z.unknown()),
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown())
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
