import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrevista } from 'src/app/Modulos/entrevista';
import { PuestoSumado, PuestosDispobible } from 'src/app/Modulos/puestos-dispobible';
import { FirebaseService } from 'src/app/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-puesto',
  templateUrl: './detalle-puesto.component.html',
  styleUrls: ['./detalle-puesto.component.css']
})
export class DetallePuestoComponent {

  //Entidades 
 pueso:any;
 entrevista:Entrevista[]=[];
 cambiopuesto:any;
  id: string = "";
   numero:any=0;
  //Formulario reactivo
  form3 = this.formBuilder.group({
    puesto: [{ value: '',disabled: true}, [Validators.required]],
    disponible: [true],
    empresa: [{ value: '',disabled: true}, [Validators.required]],
    numero: [{ value: 0,disabled: true}, [Validators.required]],
  });

  ngOnInit() {
   
    //if para pillar la id de la url se guarda en id
    if (this.route.snapshot.paramMap.get("id")) {
      this.id = this.route.snapshot.paramMap.get("id")!;
      //Busca id en la tabla cita
      this.fbs.getFireBasePorId(`Puesto`, this.id).subscribe(
        (res: any) => {
          this.pueso = res;
      
        this.form3.controls.puesto.setValue(this.pueso.puesto);
        this.form3.controls.empresa.setValue(this.pueso.empresa);
        this.form3.controls.disponible.setValue(this.pueso.disponible)
      
         
      });
    }
    //Busca a todos los usuario para llevarlo al formulario
    this.fbs.getFireBase("Entrevistrador")
              .subscribe((ent: any) => this.entrevista = ent);

    for(let entrev of this.entrevista)
    {
      if(this.id==entrev.id_puesto)
      {
        this.numero+1;
      }

    }
    this.form3.controls.numero.setValue(this.numero);
          
          
          
          
  }
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,
    private fbs: FirebaseService,private router: Router){}

    //Metodo que llama de para guardar en la base de datos
  enviar() {
    if (this.form3.value.disponible !== null && this.form3.value.disponible !== undefined) {
      this.cambiopuesto.disponible = this.form3.value.disponible;
    }
    if (this.form3.value.empresa == null && this.form3.value.empresa == undefined) {
      this.cambiopuesto.empresa = this.pueso.empresa;
    }
    if (this.form3.value.puesto == null && this.form3.value.puesto == undefined) {
      this.cambiopuesto.puesto = this.pueso.puesto;
    }
    
    
  
    this.modificarCita();   
  }

  
  modificarCita()
  {
    this.fbs.updateFireBase(this.cambiopuesto,`Puesto`, this.id!).then(() => Swal.fire({
      title: "Editado!",
      text: "Puesto ha sido editado",
      icon: 'success'
    })).catch(()=> Swal.fire({
      title: "Oops...!",
      text: "El puesto no ha sido editado",
      icon: 'error'
    }));
    this.enviarRuta()
    
  }
  enviarRuta(){
    this.router.navigateByUrl("/Puesto/listado");
  }
  
}
