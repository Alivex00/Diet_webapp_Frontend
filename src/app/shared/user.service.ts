import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { element } from 'protractor';
import { Http, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseUrl = 'https://localhost:44306/api'
  readonly ApiUrl = 'https://api.edamam.com/api/food-database/parser?ingr='
  private id_key = '&app_id=e4df3e74&'
  private app_key = 'app_key=030962516776e0f5fda5804dc7e99ccd'
  private prodname = 'apple'
  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword : ['', Validators.required]
    }, {validator: this.comparePasswords  })
  });

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value!= confirmPswrdCtrl.value)
      confirmPswrdCtrl.setErrors({  passwordMismatch:true });
      else
      confirmPswrdCtrl.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseUrl+'/ApplicationUser/Register', body);
  }
  login(formData){
    return this.http.post(this.BaseUrl+'/ApplicationUser/Login', formData);
  }
  getUserProfile(){
    return this.http.get(this.BaseUrl+'/UserProfile');
  }
  roleMatch(allowedRoles){
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  getProducts(): Observable<any>{
    return this.http.get(this.ApiUrl+ this.prodname + this.id_key + this.app_key);
  }
  updateProduct(prodname:string){
		this.prodname = prodname;
   }
}
