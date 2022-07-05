import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  
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

  constructor(private service: ClienteService, private router: Router) { }
  ngOnInit(): void {
  }

  
  create(): void{
    if(this.cliente.perfis.length > 0){
      this.service.create(this.cliente).subscribe({
        next: (resposta) => {
          this.router.navigate(['clientes']);
          swal.fire({
            icon: 'success',
            title: 'Cadastrado com sucesso!',
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
        }
      })
    } else {
      swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: 'Selecione um perfil para este usuário',
      });
    }
  }

  addPerfil(perfil: any): void{
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil),1);
      console.log(this.cliente.perfis);
    } else {
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis);
    }
  }

  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid
    && this.email.valid && this.senha.valid
  }
  
}
