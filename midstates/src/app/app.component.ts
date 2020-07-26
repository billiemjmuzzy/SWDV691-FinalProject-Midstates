import { Component } from '@angular/core';
import {Inventory} from './products/inventory.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'midstates';
  storedInventories: Inventory[] = [];

  onAddInventory(inventory) {
    this.storedInventories.push(inventory);

  }

}
