import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {CotizarComponent} from './componentes/cotizar/cotizar.component';
import {VerificaTokenGuard} from './services/guard/verifica-token.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent, canActivate: [VerificaTokenGuard] },
  {path: 'cotizar/:codigo', component: CotizarComponent, canActivate: [VerificaTokenGuard] },
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
