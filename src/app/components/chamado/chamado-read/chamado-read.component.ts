import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {
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

  constructor(private chamadoService: ChamadoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.params['id'];
    this.findById();
  }

  findById(): void{
    this.chamadoService.findById(this.chamado.id).subscribe(x => {
      this.chamado = x;
    })
  }


  validaCampos(): boolean{
    return this.prioridade.valid && this.titulo.valid &&
    this.status.valid && this.descricao.valid &&
    this.tecnico.valid && this.cliente.valid;
  }

  retornaStatus(status: any){
    if(status == '0'){
      return 'ABERTO'
    } else if(status =='1'){
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(status: any){
    if(status == '0'){
      return 'BAIXA'
    } else if(status =='1'){
      return 'MEDIA'
    } else {
      return 'ALTA'
    }
  }

}
