import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success("Użytkownik zarejestrowany", "Rejestracja udana");
        } else{
          res.errors.forEach(element => {
            switch(element.code){
              case "DuplicateUserName":
                this.toastr.error("Nazwa użytownika jest zajęta", "Rejestracja nieudana");
                break;
              default:
                  this.toastr.error(element.description, "Rejestracja nieudana");
                break;
            }
          })
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}
