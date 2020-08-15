import { AuthGuard } from './auth/auth.guard';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { LoginComponent } from './auth/login/login.component';
import { InventoryCreateComponent } from './products/inventory-create/inventory-create.component';
import { InventoryViewComponent } from './products/inventory-view/inventory-view.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: InventoryViewComponent },
  { path: 'create', component: InventoryCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:inventoryId', component: InventoryCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
