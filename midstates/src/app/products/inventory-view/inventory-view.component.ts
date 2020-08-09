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
  totalInventories = 0;
  inventoriesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private inventoriesSub: Subscription;

  constructor(public inventoriesService: InventoriesService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoriesService.getInventories(this.inventoriesPerPage, this.currentPage);
    // create subscription to get inventory data
    this.inventoriesSub = this.inventoriesService
      .getInventoryUpdateListener()
      .subscribe((inventoryData: { inventories: Inventory[], inventoryCount: number }) => {
        this.isLoading = false;
        this.totalInventories = inventoryData.inventoryCount;
        this.inventories = inventoryData.inventories;
      });
  }

  /**
   *
   * @param pageData- Object containing data about current page
   */

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.inventoriesPerPage = pageData.pageSize;
    this.inventoriesService.getInventories(this.inventoriesPerPage, this.currentPage);

  }

/**
 * Delete inventory item
 * @param inventoryId - string ID of inventory item
 */
  onDelete(inventoryId: string) {
    this.isLoading = true;
    this.inventoriesService.deleteInventory(inventoryId).subscribe(() => {
      this.inventoriesService.getInventories(this.inventoriesPerPage, this.currentPage);
    });
  }


  ngOnDestroy() {
    // removes subscription and prevents memory links
    this.inventoriesSub.unsubscribe();

  }

};
