import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString();
    console.log(
      `Ejecutando método ${req.method} en la ruta ${req.originalUrl} a las ${now}`
    );
    next();
  }
}

export function LoggerGlobalMiddleware(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toISOString();
  console.log(
    `Ejecutando Middleware Global: método ${req.method} en la ruta ${req.url} a las ${now}`
  );
  next();
}
