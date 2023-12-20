import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatosRoutingModule } from './candidatos-routing.module';
import { CandidatosComponent } from './candidatos.component';
import { ListaCandidatosComponent } from './lista-candidatos/lista-candidatos.component';
import { DetalleCandidatosComponent } from './detalle-candidatos/detalle-candidatos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CandidatosComponent,
    ListaCandidatosComponent,
    DetalleCandidatosComponent
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CandidatosModule { }
