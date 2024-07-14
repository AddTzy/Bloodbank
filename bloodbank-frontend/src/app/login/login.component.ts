import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg = "";
  adminEmail = "";
  adminPassword = "";

  constructor(private _service : RegistrationService, private _router : Router) { }

  ngOnInit(): void 
  { }

  loginUser()
  {
      this._service.loginUserFromRemote(this.user.email,this.user.password).subscribe(
        (data: any) => {
          console.log(data);
          console.log("Response Received");
          sessionStorage.setItem('loggedUser', this.user.email);
          sessionStorage.setItem('loggedUserBloodgroup', data.bloodgroup);
          sessionStorage.setItem('USER', "user");
          sessionStorage.setItem('ROLE', "user");
          // sessionStorage.setItem('USER', "admin");
          // sessionStorage.setItem('ROLE', "admin");
          this._router.navigate(['/userdashboard']);
        },
        (error: { error: any; }) => {
          console.log(error.error);
          this.msg="Bad credentials, please enter valid credentials !!!";
        }
      )
  }

}
