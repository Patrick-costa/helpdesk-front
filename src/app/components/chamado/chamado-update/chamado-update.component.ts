import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = []
  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    descricao: '',
    cliente: '',
    tecnico: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  descricao: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(private clienteService: ClienteService,
              private tecnicoService: TecnicoService,
              private chamadoService: ChamadoService,
              private router: Router) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void{
    this.chamadoService.create(this.chamado).subscribe({
      next: (resposta) => {
        this.router.navigate(['chamados']);
        swal.fire({
          icon: 'success',
          title: 'Chamado criado com sucesso!',
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
  }

  findAllClientes(): void{
    this.clienteService.findAll().subscribe(x => {
      this.clientes = x;
    })
  }

  findAllTecnicos(): void{
    this.tecnicoService.findAll().subscribe(x => {
      this.tecnicos = x;
    })
  }

  validaCampos(): boolean{
    return this.prioridade.valid && this.titulo.valid &&
    this.status.valid && this.descricao.valid &&
    this.tecnico.valid && this.cliente.valid;
  }


}
