import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class FilterAssetsInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before...');

    const now = Date.now();
    const route = context.switchToHttp().getRequest().route.path;
    let request = context.switchToHttp().getRequest();
    if (request.body.title) {
      request.body.title = 'modify request';
      console.log(request.body);
    }
    return next.handle().pipe(
      map(flow => {
        const modifiedResponse = this.keysToRemove(route, flow);
        console.log(modifiedResponse);
        return modifiedResponse;
      }),
    );
  }
  keysToRemove(route: string, body: any): any {
    let keys = [];
    switch (route) {
      case '/Sensors/:id':
        keys.push('title');
        break;

      default:
        break;
    }
    keys.forEach(key => {
      delete body[key];
    });
    return body;
  }
}
