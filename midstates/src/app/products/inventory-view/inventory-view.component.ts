import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

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
  totalInventories = 5;
  inventoriesPerPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
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
   *
   * @param pageData- Object containing data about current page
   */

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);

  }

/**
 * Delete inventory item
 * @param inventoryId - string ID of inventory item
 */
  onDelete(inventoryId: string) {
    this.inventoriesService.deleteInventory(inventoryId);
  }


  ngOnDestroy() {
    // removes subscription and prevents memory links
    this.inventoriesSub.unsubscribe();

  }

};
