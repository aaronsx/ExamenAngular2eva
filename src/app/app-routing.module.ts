import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Candidatos', loadChildren: () => import('./Vistas/candidatos/candidatos.module').then(m => m.CandidatosModule) },
  { path: 'Puesto', loadChildren: () => import('./Vistas/puesto/puesto.module').then(m => m.PuestoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
