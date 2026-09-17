import { Request, Response, NextFunction } from 'express';
export class AppError extends Error { constructor(public status:number, message:string){super(message)} }
export const notFound=(req:Request,res:Response)=>res.status(404).json({error:'Route not found'});
export const errorHandler=(err:any,_req:Request,res:Response,_next:NextFunction)=>{ console.error(err); const status=err instanceof AppError?err.status:err.name==='ZodError'?400:500; res.status(status).json({error:status===500?'Internal server error':err.message, details:err.name==='ZodError'?err.issues:undefined}); };
