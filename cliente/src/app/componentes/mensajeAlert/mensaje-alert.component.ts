import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-mensaje-alert',
    templateUrl: './mensaje-alert.component.html',
    styleUrls: ['./mensaje-alert.component.css']
})
export class MensajeAlertComponent implements OnInit {

    

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }
}