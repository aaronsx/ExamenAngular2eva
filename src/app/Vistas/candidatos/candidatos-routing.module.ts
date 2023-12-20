import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatosComponent } from './candidatos.component';
import { ListaCandidatosComponent } from './lista-candidatos/lista-candidatos.component';
import { DetalleCandidatosComponent } from './detalle-candidatos/detalle-candidatos.component';

const routes: Routes = [ { path: '', component: CandidatosComponent,  children:
[
  {path:'listado', component: ListaCandidatosComponent},
  {path:'detalle/:id', component: DetalleCandidatosComponent},
  {path:'agregar', component: DetalleCandidatosComponent}
]} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatosRoutingModule { }
