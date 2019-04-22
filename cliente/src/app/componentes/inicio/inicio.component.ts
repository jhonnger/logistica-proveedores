import { Component, OnInit } from '@angular/core';
import {LocalstorageService} from '../../services/localstorage.service';
import {MatTableDataSource, PageEvent} from '@angular/material';
import {CotizacionProveedor} from '../../interfaces/Cotizacion.interface';
import {BusquedaPaginada} from '../../../../../util/BusquedaPaginada';
import {UtilService} from '../../services/util.service';
import {MantenimientoService} from '../../services/mantenimiento.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario = {nombre: ''};
  public cotizaciones: CotizacionProveedor[];
  filtro = {};
  displayedColumns: string[] = ['pos', 'codigo', 'fechacotizacion', 'fechavencimiento', 'cotizar'];
  public paginacion: BusquedaPaginada;
  dataSource: MatTableDataSource<CotizacionProveedor>;
  constructor(private localstorageService: LocalstorageService,
              private mantenimientoService: MantenimientoService,
              private router: Router,
              private utilService: UtilService) {
    const usuario: any = JSON.parse(localstorageService.getData('usuario'));

    this.usuario.nombre = usuario.nombre;
    this.cotizaciones = [];
    this.dataSource = new MatTableDataSource(this.cotizaciones);
    this.paginacion = {
      totalRegistros: 0,
      cantidadPorPagina: 10,
      paginaActual: 0,
      data: []
    };
  }

  ngOnInit() {
    this.traerDatos();
  }
  irCotizar(id) {
    this.router.navigate(['cotizar', id]);
  }

  traerDatos() {
    this.utilService.showLoading();
    this.mantenimientoService.busquedaPaginada('cotizacion', this.paginacion.cantidadPorPagina, this.paginacion.paginaActual, this.filtro)
      .subscribe(data => {
        this.cotizaciones = data.data.rows;
        this.dataSource.data = this.cotizaciones;
        this.paginacion.totalRegistros = data.data.count;
        this.utilService.hideLoading();
        }, err => {
          console.error(err);
          this.utilService.hideLoading();
        }
      );
  }
  cambio(evento: PageEvent) {
    this.paginacion.paginaActual = evento.pageIndex;
    this.paginacion.cantidadPorPagina = evento.pageSize;
    this.traerDatos();
  }
  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('/login');
  }

}
