import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LocalstorageService} from '../localstorage.service';
import {MantenimientoService} from '../mantenimiento.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( private _localStorageService: LocalstorageService,
               private _router: Router,
               private _mantenimientoService: MantenimientoService) {

  }

  canActivate(): Promise<boolean> | boolean {
    let token: string, payload, expirado: boolean;


    token = this._localStorageService.getData('token');

    if ( token == null) {
      this._router.navigate(['/login']);
      return false;
    }

    payload = JSON.parse(atob(token.split('.')[1]));

    expirado = this.expirado(payload.exp);

    if (expirado) {
      this._router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;

    return fechaExp < ahora ;
  }
  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);

      const ahora = new Date();

      ahora.setTime(ahora.getTime() + ( 2 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._mantenimientoService.renuevaToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this._router.navigate(['/login']);
            reject(false);
          });
      }
    });
  }

}
