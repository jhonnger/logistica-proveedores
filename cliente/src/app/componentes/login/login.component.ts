import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UtilService} from '../../services/util.service';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario = {numdocumento: '', password: ''};

  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private loginService: LoginService,
              private utilService: UtilService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.utilService.esNullUndefinedOVacio(this.usuario.numdocumento) ||
      this.utilService.esNullUndefinedOVacio(this.usuario.password)) {
      this.openSnackBar();
      return;
    }

    this.loginService.login( this.usuario )
      .subscribe(data => {
        if ( !data.ok ) {
          this.utilService.alertMensaje('Credenciales Incorrectas');
          return;
        }

        localStorage.setItem('usuario', JSON.stringify( data.data ));
        localStorage.setItem('token', data.token );

        this.router.navigate(['inicio']);
      }, error => {
        console.log(error);
      } );

  }

  openSnackBar() {
    const snackBarRef = this.snackBar.open('Email o contraseña incorrecto', 'cerrar', {
      duration: 3000
    });
  }


}
