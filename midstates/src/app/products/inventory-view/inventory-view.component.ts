import { Component, Input } from '@angular/core';
import {Inventory} from '../inventory.model'
@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent {

  elements: any = []
  headElements = ['image', 'brand', 'year', 'hours', 'condition', 'serial', 'price', 'description'];
  @Input() inventories: Inventory[] = [];

}
