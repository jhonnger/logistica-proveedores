import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVER } from '../global/config';
import {LocalstorageService} from './localstorage.service';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;

  constructor(private http: HttpClient,
              private utilService: UtilService,
              private localStorage: LocalstorageService) {
    this.url =  URL_SERVER + 'login';
  }


  login( lg ): Observable<any> {
    return this.http.post( this.url , lg )
      .pipe(
        map((res: any) => {

          return res;
        }),
        catchError(err => {
          return Observable.create(err);
        })
      );
  }
  estaLogueado() {
    return !this.utilService.esNullUndefinedOVacio(this.localStorage.getData('token'));
  }

  validartoken( token ): Observable<any> {
    this.url  = this.url + `/validtoken?token=${ token }`;
    return this.http.get( this.url )
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(err => {
          return Observable.create(err);
        })
      );
  }

}
