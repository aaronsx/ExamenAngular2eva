import { Component } from '@angular/core';
import { Candidato } from 'src/app/Modulos/candidato';
import { PuestosDispobible } from 'src/app/Modulos/puestos-dispobible';
import { FirebaseService } from 'src/app/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-puesto',
  templateUrl: './lista-puesto.component.html',
  styleUrls: ['./lista-puesto.component.css']
})
export class ListaPuestoComponent {

   //Entidades
   puestos: any[] = [];
   candidatos:Candidato[]=[];
   mostrarTodo: any[] = [];

   constructor(private fbs: FirebaseService) {}

   ngOnInit() 
   {
     this.obtenerCitasDia();
   }
     
  

   obtenerCitasDia() {
  
   let shouldBreak = false;
   // Obtiene los puestos del día de la base de datos
   this.fbs.getFireBase(`Puesto`).subscribe((res) => {
     //Si no hay nada nada la creas
     if (res.length === 0) {
       this.addCitas();
     } else {
      
       this.puestos = res;

      
     }
   })
 }
   //Metodo eliminar puesto
   eliminaPuesto(puesto: PuestosDispobible)
   {
   
    
    
       //Estos son alertas para saber si quieres borrar 
       const swalWithBootstrapButtons = Swal.mixin(
       {
         customClass: 
         {
           confirmButton: "btn btn-success",
           cancelButton: "btn btn-danger"
         },
         buttonsStyling: false
       });
       swalWithBootstrapButtons.fire(
       {
         title: "¿Estás seguro?",
         text: "¡No se podrán revertir los cambios!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: "Si, eliminar!",
         cancelButtonText: "No, cancelar!",
         reverseButtons: true
       }).then((result) => 
       {
         if (result.isConfirmed) 
         {
           //Si el usuario confirma borraria la cita
           this.fbs.deleteFireBase(puesto,`Puesto`) .then(() => swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El puesto ha sido eliminado",
            icon: "success"
          }))
          .catch(() => swalWithBootstrapButtons.fire({
            title: "Oops...!",
            text: "El puesto no ha sido eliminado",
            icon: "error"
          }));;
           
         } else if (
           /* Read more about handling dismissals below */
           result.dismiss === Swal.DismissReason.cancel
         ){
           swalWithBootstrapButtons.fire(
           {
             title: "Cancelado",
             text: "El puesto no ha sido eliminado",
             icon: "error"
           });
         }
       });
   }

   addCitas() {
     
     let puesto = ["Jardinero", "Progamador", "Administracion", "Tecnico", "Backend"];
     let empresa = ["Ayuntamiento", "Der", "Duf", "Rw", "Mert"];
     let puestos: PuestosDispobible[] = [];
 
     // Hacemos un bucle para añadir puestos
     for (let index = 0; index < puesto.length; index++) {
       
       puestos.push({disponible: true,empresa: empresa[index],puesto: puesto[index]});
     }
 
     // nos recoremos puestos y lo insertamos 
     for (let index = 0; index < puestos.length; index++) {
       this.fbs.setFireBase(puestos[index], "Puesto");
     }
   }
 }

