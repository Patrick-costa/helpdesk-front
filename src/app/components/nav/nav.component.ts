import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['tecnicos']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
    swal.fire({
      icon: 'info',
      title: 'Logout',
      text: 'Logout efetuado con sucesso!',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
