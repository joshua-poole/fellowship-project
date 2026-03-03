import * as z from 'zod';

export const TableScalarFieldEnumSchema = z.enum(['id', 'name', 'baseId', 'createdAt', 'updatedAt', 'userId'])

export type TableScalarFieldEnum = z.infer<typeof TableScalarFieldEnumSchema>;