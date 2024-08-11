import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

export class TestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();

    const userId = request.params.userId;
    request.params.userId = userId + 0; // "1" + 0 = 10
    request.params['userId'] = userId + 0;

    console.log('interceptor');
    console.log(request.params.userId);

    return next.handle().pipe(map((data) => data));
  }
}
