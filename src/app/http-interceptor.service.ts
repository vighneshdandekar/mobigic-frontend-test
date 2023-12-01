// http-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add custom logic here, such as adding headers, logging, etc.

    if (request.url.includes('/login') || request.url.includes('/register')) {
      return next.handle(request); // Skip interceptor for login and register requests
    }

    // For example, add a custom header to each request
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': localStorage.getItem('mobigic_token'),
      },
    });



    // Pass the modified request to the next handler
    return next.handle(modifiedRequest)
    // .pipe(
    //   catchError((error: any) => {
    //     if (error instanceof HttpErrorResponse && error.status === 401) {
    //       // Unauthorized - clear local storage and navigate to login
    //       localStorage.clear();
    //       this.router.navigate(['/login']);
    //     }

    //     return throwError(error);
    //   })
    // );
  }
}
