import * as z from 'zod';

export const RowScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'tableId', 'values'])

export type RowScalarFieldEnum = z.infer<typeof RowScalarFieldEnumSchema>;