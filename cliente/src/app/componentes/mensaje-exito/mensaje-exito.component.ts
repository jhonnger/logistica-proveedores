import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-mensaje-exito',
    templateUrl: './mensaje-exito.component.html',
    styleUrls: ['./mensaje-exito.component.css']
})

export class MensajeExitoComponent implements OnInit {
    icono = '';
    titulo = '';
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.success) {
            this.titulo = 'Éxito';
            this.icono = '/assets/img/success.png';
        } else {
            this.titulo = 'Error';
            this.icono = '/assets/img/error.png';
        }
    }

    ngOnInit() { }
}
