import { AuthInterceptor } from './auth/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { InventoryCreateComponent } from './products/inventory-create/inventory-create.component';
import { HeaderComponent } from './header/header/header.component';
import { InventoryViewComponent } from './products/inventory-view/inventory-view.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    InventoryCreateComponent,
    HeaderComponent,
    InventoryViewComponent,
    NewUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [
    MDBSpinningPreloader,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
