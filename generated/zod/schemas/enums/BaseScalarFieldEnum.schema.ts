import * as z from 'zod';

export const BaseScalarFieldEnumSchema = z.enum(['id', 'name', 'userId', 'createdAt', 'updatedAt'])

export type BaseScalarFieldEnum = z.infer<typeof BaseScalarFieldEnumSchema>;