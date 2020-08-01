import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Inventory } from '../inventory.model';
import { InventoriesService } from '../inventories.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  inventories: Inventory[] = [];
  private inventoriesSub: Subscription;
  constructor(public inventoriesService: InventoriesService) { }

  ngOnInit() {
    this.inventoriesService.getInventories();
    // create subscription to get inventory data
    this.inventoriesSub = this.inventoriesService.getInventoryUpdateListener()
      .subscribe((inventories: Inventory[]) => {
        this.inventories = inventories;
      });

  }

}
