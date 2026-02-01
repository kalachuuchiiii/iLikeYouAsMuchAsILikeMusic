import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../errors/AppErrors.js";
import z, { success } from "zod";


export const catchErrors = (fn: RequestHandler): RequestHandler => async(req, res, next) => {
  try{
    return await fn(req, res, next);
  }catch(e){
    next(e);
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{

  if(err.name === 'TokenExpiredError'){
    return res.status(401).json({
      success: false,
      code: 'TOKEN_EXPIRED_ERROR'
    })
  }

  
   if(err instanceof z.ZodError){
    const message = err.issues[0]?.message;
    const code = err.issues[0]?.code;
    return res.status(400).json({
        success: false,
        message,
        code
    })
  }
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        code: err.code
    })
  }
  if(err instanceof Error){
    return res.status(500).json({
        success: false,
        message: err.message
    })
  }
 

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR'
  })
}