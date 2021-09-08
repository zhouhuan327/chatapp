import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StatusCode } from "../constants";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseData<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseData<T>> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          code: StatusCode.Success,
          message: "请求成功",
          data,
        };
      }),
    );
  }
}
