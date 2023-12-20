import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-candidatos',
  templateUrl: './detalle-candidatos.component.html',
  styleUrls: ['./detalle-candidatos.component.css']
})
export class DetalleCandidatosComponent {

  //Entidades
  candidato: any;
  id: string = "";
  form3 = this.formBuilder.group({
    id:[''],
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.maxLength(15)]],
    direccion: ['',[ Validators.required, Validators.minLength(3)]],
    fechaDeNacimiento: ['',[ Validators.required]],
    dni: ['', [Validators.required, Validators.maxLength(9)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required,Validators.maxLength(9)]]  
  })
    ngOnInit() 
    {
      //if para pillar la id de la url se guarda en id
      if (this.route.snapshot.paramMap.get("id")) {
        this.id = this.route.snapshot.paramMap.get("id")!;
        //Busca id en la tabla usuario
        this.fbs.getFireBasePorId('Candidato', this.id).subscribe(
          (res: any) => {
            this.candidato = res;
    
            // Asigna los valores del usuario al formulario
            this.form3.setValue(this.candidato);
          }
        );
      }
    }
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private router: Router,private fbs: FirebaseService){}

  enviar() {
    
    if(this.id != "")
      this.modificarCandidato();
    else
      this.agregarCandidato();  
    
    this.enviarRuta();
  }

  agregarCandidato()
  {
    //Swal es un tipo de alertas realizada si se borra o no el candidato
    this.fbs.setFireBase(this.form3.value,'Candidato').then(() => Swal.fire({
        title: "Guardado!",
        text: "Candidato ha sido guardado",
        icon: 'success'
      }))
      .catch(()=> Swal.fire({
        title: "Oops...!",
        text: "El candidato no ha sido guardado",
        icon: 'error'
      }));
  
  }
  modificarCandidato()
  {
    //Swal es un tipo de alertas realizada
    this.fbs.updateFireBase(this.form3.value,'Candidato', this.id!).then(() => Swal.fire({
      title: "Editado!",
      text: "Candidato ha sido editado",
      icon: 'success'
    }))
    .catch(()=> Swal.fire({
      title: "Oops...!",
      text: "El candidato no ha sido editado",
      icon: 'error'
    }));
  }
  enviarRuta(){
    this.router.navigateByUrl("/Candidato/listado");
  }
}
