import { Component, OnInit } from '@angular/core';
import {Cotizacion} from '../../interfaces/Cotizacion.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {MantenimientoService} from '../../services/mantenimiento.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {

  cotizacion: Cotizacion = {
    cotizaciondetalle: [
      {producto: {nombre: 'ALFILERES'}, cantidad: 20, unidad: {nombre: 'UNIDAD'}},
      {producto: {nombre: 'PAPEL BOND X 100'}, cantidad: 20, unidad: {nombre: 'UNIDAD'}},
      {producto: {nombre: 'ESCOBILLA PARA LAVAR'}, cantidad: 20, unidad: {nombre: 'UNIDAD'}},
      {producto: {nombre: 'RECOGEDOR DE PLASTICO'}, cantidad: 10, unidad: {nombre: 'UNIDAD'}},
      {producto: {nombre: 'MESA DE MADERA'}, cantidad: 20, unidad: {nombre: 'UNIDAD'}},
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

      this.mantenimientoService.obtener(`cotizacion/${codigo}`)
        .subscribe(data => {
          this.cotizacion = data.cotizacion;
        }, error1 => {
          console.log(error1);
        });
    }
  }

}
