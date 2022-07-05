import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  
cliente: Cliente = {
  id: '',
  nome: '',
  cpf: '',
  email: '',
  senha: '',
  perfis:[],
  dataCriacao: '',
}

constructor(
  private service: ClienteService, 
  private router: Router,
  private route: ActivatedRoute) { }
ngOnInit(): void {
  this.cliente.id = this.route.snapshot.params['id'];
  this.findById();

}

findById():void{
  this.service.findById(this.cliente.id).subscribe({
    next: (resposta) => {
      this.cliente = resposta;
      for(var i = 0; i <= 2; i++){
        if(this.cliente.perfis[i] == 'ADMIN'){
          this.cliente.perfis[i] = 0
        }
        if(this.cliente.perfis[i] == 'CLIENTE'){
          this.cliente.perfis[i] = 1
        }
        if(this.cliente.perfis[i] == 'TECNICO'){
          this.cliente.perfis[i] = 2
        }
      }
      console.log(this.cliente)
    }
  })
}

update(): void{
    this.service.update(this.cliente).subscribe({
      next: (resposta) => {
        this.router.navigate(['clientes']);
        console.log(resposta)
        swal.fire({
          icon: 'success',
          title: 'Atualizado com sucesso!',
          showConfirmButton: false,
          timer: 1000
        });
      },
      error: (error) =>{
        let message = error.error.message;
        let title = error.error.error;
        console.log(error);
        swal.fire({
          icon: 'error',
          title: title,
          text: message,
        });
        console.log(this.cliente);
      }
    })
}


validaCampos(): boolean{
  return this.nome.valid && this.cpf.valid
  && this.email.valid && this.senha.valid
}

}
