import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class tokenAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 在这里取metadata中的no-auth，得到的会是一个bool
    const noAuth = this.reflector.get<boolean>("no-auth", context.getHandler());
    // 被noAuth装饰器后的路由不走jwt守卫
    if (noAuth) {
      return true;
    }
    const guard = new (AuthGuard("jwt"))();
    return guard.canActivate(context); //  执行所选策略Guard的canActivate方法
  }
}
