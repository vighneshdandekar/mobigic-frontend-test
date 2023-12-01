import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private AuthenticationService: AuthenticationService,) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.AuthenticationService.register(this.username, this.password).subscribe(
      data => {
      },
      err => { console.log(err) }
    )
  }

}
