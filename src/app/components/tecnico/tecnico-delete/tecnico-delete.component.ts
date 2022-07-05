import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

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
    perfis: [],
    dataCriacao: '',
  }

  constructor(
    private service: TecnicoService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.params['id'];
    this.findById();

  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe({
      next: (resposta) => {
        this.tecnico = resposta;
        for (var i = 0; i <= 2; i++) {
          if (this.tecnico.perfis[i] == 'ADMIN') {
            this.tecnico.perfis[i] = 0
          }
          if (this.tecnico.perfis[i] == 'CLIENTE') {
            this.tecnico.perfis[i] = 1
          }
          if (this.tecnico.perfis[i] == 'TECNICO') {
            this.tecnico.perfis[i] = 2
          }
        }
        console.log(this.tecnico)
      }
    })
  }

  deleteUser(): void {
    this.service.delete(this.tecnico.id).subscribe({
      next: (resposta: any) => {
        this.router.navigate(['tecnicos']);
        console.log(resposta)
        swal.fire({
          icon: 'success',
          title: 'Deletado com sucesso!',
          showConfirmButton: false,
          timer: 1000
        });
      },
      error: (error: any) => {
        let message = error.error.message;
        let title = error.error.error;
        console.log(error);
        swal.fire({
          icon: 'error',
          title: title,
          text: message,
        });
        console.log(this.tecnico);
      }
    })
  }



}
