import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { InventoryCreateComponent } from './products/inventory-create/inventory-create.component';
import { HeaderComponent } from './header/header/header.component';
import { InventoryViewComponent } from './products/inventory-view/inventory-view.component';
import { InventoryDetailsComponent } from './products/inventory-details/inventory-details.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryCreateComponent,
    HeaderComponent,
    InventoryViewComponent,
    InventoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
