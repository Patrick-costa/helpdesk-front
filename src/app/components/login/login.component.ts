import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) { }

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: (resposta) => {
        this.service.successfullLogin(resposta.headers.get('Authorization')?.substring(7));
        swal.fire({
          icon: 'success',
          title: 'Logado com sucesso!',
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {   
          this.router.navigate(['home']);
        }, 1000);
      },
      error: (error) => {
        swal.fire({
          icon: 'error',
          title: 'Login',
          text: 'Usuario ou senha incorretos',
          showConfirmButton: false,
          timer: 1000
        });
        this.creds.senha = '';
      }
    });

    // swal.fire({
    //   icon: 'error',
    //   title: 'Login',
    //   text: 'Usuario ou senha incorretos',
    //   showConfirmButton: false,
    //   timer: 1000
    // });
    // this.creds.senha = '';
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
