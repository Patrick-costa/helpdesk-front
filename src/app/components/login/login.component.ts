import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  ngOnInit(): void {
  }

  logar(){
    swal.fire({
      icon: 'error',
      title: 'Login',
      text: 'Usuario ou senha incorretos',
      showConfirmButton: false,
      timer: 1000
    });
    this.creds.senha = '';
  }

  validaCampos(): boolean{
    return this.email.valid && this.senha.valid;
  }
}
