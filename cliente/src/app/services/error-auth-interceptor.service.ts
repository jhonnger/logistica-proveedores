import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UtilService} from './util.service';

@Injectable({

  providedIn: 'root'
})
export class ErrorAuthInterceptorService implements HttpInterceptor {


  constructor(private router: Router,
              private utilService: UtilService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let respuesta;
        if (err.status == 401) {
           this.router.navigate(['/login']);
           this.utilService.alertMensaje('Sesion Terminada');
           return throwError(err);
        } else {
          respuesta = err.error;
          if (!this.utilService.esNullUndefinedOVacio(respuesta) &&
            !this.utilService.esNullUndefinedOVacio(respuesta.message)) {
            this.utilService.errorMensaje(respuesta.message);
          } else {
            this.utilService.errorMensaje('Error al conectarse con el servidor');
          }
          return throwError(err);
        }
      })
    );
  }
}
