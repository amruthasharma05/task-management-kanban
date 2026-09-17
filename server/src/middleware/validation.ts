import { z } from 'zod';
export const idSchema=z.string().uuid();
export const taskSchema=z.object({title:z.string().trim().min(1).max(200),description:z.string().max(2000).optional().nullable(),priority:z.enum(['LOW','MEDIUM','HIGH']),status:z.enum(['TODO','IN_PROGRESS','DONE']).optional(),projectId:idSchema,assignedTo:idSchema.optional().nullable(),dueDate:z.string().datetime().optional().nullable()});
export const statusSchema=z.object({status:z.enum(['TODO','IN_PROGRESS','DONE'])});
export const projectSchema=z.object({name:z.string().trim().min(1).max(120),description:z.string().max(1000).optional().nullable()});
