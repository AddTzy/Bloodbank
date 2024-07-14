import { Component, OnInit, Self } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DonorService } from '../donor.service';
import { Requesting } from '../requesting';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requesthistory',
  templateUrl: './requesthistory.component.html',
  styleUrls: ['./requesthistory.component.css']
})
export class RequesthistoryComponent implements OnInit {

  loggedUser = '';
  loggedUserBloodgroup = '';
  tempUser = '';
  msg = '';
  title = '';
  requests : any[] = [];
  responses : Observable<any> | undefined;

  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {    
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUserBloodgroup = JSON.stringify(sessionStorage.getItem('loggedUserBloodgroup')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;
    this.msg = '';
    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
    }
    else{
      this.title = "User Dashboard";
    }
    this.reloadData();
  }

  navigateHome()
  {
    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
      this._router.navigate(['/loginsuccess']);
    }
    else{
      this.title = "User Dashboard";
      this._router.navigate(['/userdashboard']);
    }
  }

  reloadData() 
  {
    this.donorService.getOpenRequests(JSON.parse(this.loggedUserBloodgroup), this.loggedUser).subscribe(result => {
      this.requests = result;
    });
  }

  acceptRequest(id : number)
  {
    this.donorService.acceptRequestForBlood(this.loggedUser, id).subscribe(result => {
      console.log(result);
    });
    $("#acceptbtn").hide();
    $("#rejectbtn").hide();
    $("#acceptedbtn").show();
    $("#rejectedbtn").hide();
    $("acceptbtn").val("Accepted");
  }

  rejectRequest(curremail : string)
  {
    this.responses = this.donorService.rejectRequestForBlood(curremail);
    $("#acceptbtn").hide();
    $("#rejectbtn").hide();
    $("#acceptedbtn").hide();
    $("#rejectedbtn").show();
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  removeFromList(history: any){
    this.requests.splice(this.requests.indexOf(history), 1);
  }
  
}
