import { ForbiddenException, Injectable, CanActivate, ExecutionContext, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token is missing or invalid');
        }

        const token = authHeader ? authHeader.split(' ')[1] : undefined;
        console.log('token: ',token);
        

        try {
            // example of token validation
            if (token !== 'valid-token') {
                throw new UnauthorizedException('Invalid or expired token');
            }

        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        next();
    }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No roles defined, allow access
    }

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    // logic to extract user roles from token
    console.log('token: ',token);
    

    // Simulate extracting user roles from token
    const user = {
      id: '123',
      roles: ['admin'], // Example user roles
    };

    const hasRole = () => user.roles.some((role) => requiredRoles.includes(role));

    if (!user || !hasRole()) {
      throw new ForbiddenException(`You don't have permission to access this resource`);
    }

    return true; // Access is granted
  }
}

  