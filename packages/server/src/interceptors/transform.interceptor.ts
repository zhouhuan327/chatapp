import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { StatusCode } from "../constants";
import { Response } from "share/types";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
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
