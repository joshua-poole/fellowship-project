import * as z from 'zod';

export const ColumnScalarFieldEnumSchema = z.enum(['id', 'name', 'type', 'order', 'description', 'defaultValue', 'createdAt', 'updatedAt', 'tableId'])

export type ColumnScalarFieldEnum = z.infer<typeof ColumnScalarFieldEnumSchema>;