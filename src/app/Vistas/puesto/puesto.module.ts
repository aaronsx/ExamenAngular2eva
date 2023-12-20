import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestoRoutingModule } from './puesto-routing.module';
import { PuestoComponent } from './puesto.component';
import { DetallePuestoComponent } from './detalle-puesto/detalle-puesto.component';
import { ListaPuestoComponent } from './lista-puesto/lista-puesto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PuestoComponent,
    DetallePuestoComponent,
    ListaPuestoComponent
  ],
  imports: [
    CommonModule,
    PuestoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PuestoModule { }
