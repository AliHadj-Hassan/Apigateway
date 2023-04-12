import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let token=request.headers['authorization']?.split(' ')[1];
        if (!token){
            return false;
        }
        try {
            const res = await firstValueFrom(this.authServiceClient.send(
                'verifytoken',
                token))
            if (res!=null){
                request.user=res;
                return true;
            } 
            return false;
        } catch (err) {
            return false;
        }
    }
}