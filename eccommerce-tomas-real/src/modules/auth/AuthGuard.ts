import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    console.log('Auth Header:', authHeader); // Log the Authorization header

    if (!authHeader) {
      console.error('Authorization header is missing');
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authHeader.split(' ');
    console.log('Token Type:', type); // Log the token type
    console.log('Token:', token); // Log the token

    if (type !== 'Bearer' || !token) {
      console.error('Invalid authorization format');
      throw new UnauthorizedException('Invalid authorization format');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Token Payload ( este no me lo loguea):', payload); // Log the token payload
      request['user'] = payload;
    } catch (error) {
      console.error('Invalid token:', error.message);
      throw new UnauthorizedException('Invalid token');
    }

    console.log('Token verification successful');
    return true;
  }
}
