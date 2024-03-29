import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
  {path:'user', component:UserComponent,
    children: [
      {path:'registration', component: RegistrationComponent},
      {path:'login', component: LoginComponent}
  ]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'product', component:ProductComponent, canActivate:[AuthGuard]},
  {path:'forbidden', component:ForbiddenComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard], data : {permittedRoles: ['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
