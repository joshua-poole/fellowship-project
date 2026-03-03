import * as z from 'zod';

export const ColumnTypeSchema = z.enum(['TEXT', 'NUMBER'])

export type ColumnType = z.infer<typeof ColumnTypeSchema>;