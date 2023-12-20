import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuestoComponent } from './puesto.component';
import { ListaPuestoComponent } from './lista-puesto/lista-puesto.component';
import { DetallePuestoComponent } from './detalle-puesto/detalle-puesto.component';

const routes: Routes = [ { path: '', component: PuestoComponent,  children:
[
  {path:'listado', component: ListaPuestoComponent},
  {path:'detalle/:id', component: DetallePuestoComponent},
  {path:'agregar', component: DetallePuestoComponent}
]} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuestoRoutingModule { }
