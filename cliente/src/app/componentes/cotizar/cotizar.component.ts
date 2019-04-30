import { Component, OnInit } from '@angular/core';
import {CotizacionProveedor} from '../../interfaces/Cotizacion.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {MantenimientoService} from '../../services/mantenimiento.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {

  cotizacion: CotizacionProveedor = {
    cotizacion: {},
    cotizaciondetalle: [
    ]
  };
  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private mantenimientoService: MantenimientoService,
              private utilService: UtilService) { }

  ngOnInit() {
    const codigo = this.activateRoute.snapshot.paramMap.get('codigo');

    if (!this.utilService.esNullUndefinedOVacio(codigo)) {
      this.cotizacion.id = parseInt( codigo, 10);
      this.utilService.showLoading();
      this.mantenimientoService.obtener(`cotizacionproveedor/${codigo}`)
        .subscribe(data => {
          if (data.ok) {
            this.cotizacion = data.cotizacionProveedor;
            if (Array.isArray(this.cotizacion.cotizaciondetalle)) {
              this.cotizacion.cotizaciondetalle.forEach((value) => {
                if (this.utilService.esNullUndefinedOVacio(value.preciounitario)) {
                  value.preciounitario = 0;
                }
              });
            }
          } else {
            this.utilService.errorMensaje('Error al traer la cotizacion');
          }

          this.utilService.hideLoading();
        }, error1 => {
          console.log(error1);
          this.utilService.hideLoading();
        });
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('/login');
  }
  guardar() {
    this.utilService.showLoading();
    this.mantenimientoService.guardar('cotizacionproveedor', this.cotizacion)
      .subscribe(data => {
        this.utilService.hideLoading();
        if (data.ok) {
          this.router.navigateByUrl('/inicio');
          this.utilService.exitoMensaje('Cotización guardada exitosamente');
        } else {
          this.utilService.errorMensaje(data.message);
        }
      }, error1 => {
        this.utilService.hideLoading();
        this.utilService.errorMensaje('No se pudo guardar la cotización');
      });
  }
  validarCotizacion() {
    let productoSinPrecio;

    productoSinPrecio = this.obtenerProductoSinPrecio();

    if (this.utilService.esNullUndefinedOVacio(this.cotizacion.formapago)) {
      this.utilService.alertMensaje('Debe ingresar la forma de pago');
      return false;
    }
    if (this.utilService.esNullUndefinedOVacio(this.cotizacion.tiempoentrega)) {
      this.utilService.alertMensaje('Debe ingresar los días de entrega');
      return false;
    }

    if (!this.utilService.esNullUndefinedOVacio(productoSinPrecio)) {
        this.utilService.showConfirm('Existen productos sin precio especificado, ¿Continuar de todos modos?', () => {
          this.guardar();
        });
        return;
    }

    this.guardar();
  }

  obtenerProductoSinPrecio() {
    let res;
    let aux = [];
    if (this.utilService.esArrayNoVacio(this.cotizacion.cotizaciondetalle)) {
      aux = this.cotizacion.cotizaciondetalle.filter(cd => {
        return  this.utilService.esNullUndefinedOVacio(cd.preciounitario);
      });
    }
    if (this.utilService.esArrayNoVacio(aux)) {
      res = aux[0];
    }
    return res;
  }

}
