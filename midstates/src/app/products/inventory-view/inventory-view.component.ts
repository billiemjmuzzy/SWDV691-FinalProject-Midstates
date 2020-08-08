import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Inventory } from '../inventory.model';
import { InventoriesService } from '../inventories.service';


@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit, OnDestroy {
  inventories: Inventory[] = [];
  isLoading = false;
  private inventoriesSub: Subscription;

  constructor(public inventoriesService: InventoriesService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoriesService.getInventories();
    // create subscription to get inventory data
    this.inventoriesSub = this.inventoriesService.getInventoryUpdateListener()
      .subscribe((inventories: Inventory[]) => {
        this.isLoading = false;
        this.inventories = inventories;
      });
  }

  /**
   * Deletes the inventory item
   */
  onDelete(inventoryId: string) {
    this.inventoriesService.deleteInventory(inventoryId);
  }


  ngOnDestroy() {
    // removes subscription and prevents memory links
    this.inventoriesSub.unsubscribe();

  }

};
