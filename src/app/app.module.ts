import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ProductComponent } from './product/product.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ForbiddenComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
