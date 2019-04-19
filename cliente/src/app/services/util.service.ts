import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MensajeAlertComponent } from '../componentes/mensajeAlert/mensaje-alert.component';
import { MensajeExitoComponent } from '../componentes/mensaje-exito/mensaje-exito.component';
import {MensajeConfirmComponent} from '../componentes/mensaje-confirm/mensaje-confirm.component';
import {LoadingComponent} from '../componentes/Loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

    dialogRefe: any;
    constructor(public dialog: MatDialog) {
    }
  showLoading() {
    const id = 'loading' ;
    if (this.dialog.getDialogById(id)) {
      return;
    }
    setTimeout( () => {
      this.dialogRefe = this.dialog.open(LoadingComponent, {
        id,
        disableClose: true
      });
    }, 0);
  }

  hideLoading() {
    setTimeout(() => {
      this.dialogRefe.close();
    }, 10);
  }

    alertMensaje(mensaje: string) {
        this.dialog.open(MensajeAlertComponent, {
            id: 'mensaje',
            data: {mensaje}
        });
    }


    showConfirm(mensaje: string, funcion) {
      const dialogRef = this.dialog.open(MensajeConfirmComponent, {
        id: 'mensajeConfirm',
        disableClose: true,
        data: {mensaje}
      });

      dialogRef.afterClosed().subscribe(result => {

        if ( result) {
          funcion();
        }
      });
    }
  exitoMensaje(mensaje: string) {
        this.dialog.open(MensajeExitoComponent, {
            id: 'exito',
            data: {success: true, mensaje}
        });
    }
  errorMensaje(mensaje: string) {
        this.dialog.open(MensajeExitoComponent, {
            id: 'error',
            data: {success: false, mensaje}
        });
    }
  esNullUndefinedOVacio(valor: any) {
    return valor == null || valor == undefined || valor === '';
  }
  esEntidadValida(valor: any) {
    return !this.esNullUndefinedOVacio(valor) && typeof valor == 'object' && !this.esNullUndefinedOVacio(valor.id);
  }
  esObjectValido(value: any): boolean{
    return !this.esNullUndefinedOVacio(value) && typeof value == 'object';
  }
  esStringValido(value: any): boolean{
    return !this.esNullUndefinedOVacio(value) && typeof value == 'string';
  }
  esArrayValido(value: any): boolean{
    return Array.isArray(value);
  }
  esArrayNoVacio(value: any){
    return this.esArrayValido(value) && value.length > 0;
  }

}
