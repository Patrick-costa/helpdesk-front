import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {
  
    nome: FormControl = new FormControl(null, Validators.minLength(3));
    cpf: FormControl = new FormControl(null, Validators.required);
    email: FormControl = new FormControl(null, Validators.email);
    senha: FormControl = new FormControl(null, Validators.minLength(3));
    
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis:[],
    dataCriacao: '',
  }

  constructor(private service: TecnicoService, private router: Router) { }
  ngOnInit(): void {
  }

  
  create(): void{
    if(this.tecnico.perfis.length > 0){
      this.service.create(this.tecnico).subscribe({
        next: (resposta) => {
          this.router.navigate(['tecnicos']);
          console.log(resposta)
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
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1);
      console.log(this.tecnico.perfis);
    } else {
      this.tecnico.perfis.push(perfil);
      console.log(this.tecnico.perfis);
    }
  }

  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid
    && this.email.valid && this.senha.valid
  }
  
}
