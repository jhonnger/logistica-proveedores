import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-mensaje-confirm',
  templateUrl: './mensaje-confirm.component.html',
  styleUrls: ['./mensaje-confirm.component.css']
})
export class MensajeConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

}
