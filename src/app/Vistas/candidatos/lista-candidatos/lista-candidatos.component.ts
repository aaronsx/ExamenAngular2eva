import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Candidato } from 'src/app/Modulos/candidato';
import { FirebaseService } from 'src/app/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-candidatos',
  templateUrl: './lista-candidatos.component.html',
  styleUrls: ['./lista-candidatos.component.css']
})
export class ListaCandidatosComponent {
  candidatos:Candidato[]=[];
  constructor(private fbs:FirebaseService,private router:Router){}
  
  ngOnInit()
  {
    this.fbs.getFireBase("Candidato")
            .subscribe(res => this.candidatos = res);
  }
  //Metodo eliminar candidato
  eliminaCandidato(candidat: Candidato){
    //Estos son alertas para saber si quieres borrar 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡No se podrán revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //Si el usuario confirma borraria el usuario
       this.fbs.deleteFireBase(candidat, "Candidato")
          .then(() => swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El candidato ha sido eliminado",
            icon: "success"
          }))
          .catch(() => swalWithBootstrapButtons.fire({
            title: "Oops...!",
            text: "El candidato no ha sido eliminado",
            icon: "error"
          }));

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El candidato no ha sido eliminado",
          icon: "error"
        });
      }
    });
  }
 
}
