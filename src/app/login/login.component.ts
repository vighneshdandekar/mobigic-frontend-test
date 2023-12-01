import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private AuthenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.AuthenticationService.isAuthenticated()) {
      this.router.navigate(['/dashboard'])
    }
  }


  onSubmit() {
    this.AuthenticationService.login(this.username, this.password).subscribe(
      (data) => {
        this.AuthenticationService.saveToken(data?.seessionToken)
        this.router.navigate(['/dashboard'])
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
