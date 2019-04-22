import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpperCaseText} from './directives/mayuscula.directive';
import {Numerico} from './directives/numerico.directive';
import { InicioComponent } from './componentes/inicio/inicio.component';
import {MensajeAlertComponent} from './componentes/mensajeAlert/mensaje-alert.component';
import {MensajeExitoComponent} from './componentes/mensaje-exito/mensaje-exito.component';
import {LoadingComponent} from './componentes/Loading/loading.component';
import {MensajeConfirmComponent} from './componentes/mensaje-confirm/mensaje-confirm.component';
import { CotizarComponent } from './componentes/cotizar/cotizar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AutofocusDirective} from './directives/autofocus.directive';
import {ErrorAuthInterceptorService} from './services/error-auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpperCaseText,
    AutofocusDirective,
    Numerico,
    InicioComponent,
    MensajeAlertComponent,
    MensajeExitoComponent,
    LoadingComponent,
    MensajeConfirmComponent,
    CotizarComponent
  ], entryComponents: [ MensajeAlertComponent, MensajeExitoComponent, LoadingComponent, MensajeConfirmComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorAuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
