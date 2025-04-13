import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../types/request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>(); 
        const user = request.user;
        
        if (!user) {
            return false; 
        }
        
        return user.roles.some(role => role.name === 'admin'); // 🔒 Verificar si tiene rol de admin
    }
}
