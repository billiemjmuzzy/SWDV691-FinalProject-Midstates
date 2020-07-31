import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { InventoryCreateComponent } from './products/inventory-create/inventory-create.component';
import { HeaderComponent } from './header/header/header.component';
import { InventoryViewComponent } from './products/inventory-view/inventory-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryCreateComponent,
    HeaderComponent,
    InventoryViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    HttpClientModule
  ],
  providers: [
    MDBSpinningPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
