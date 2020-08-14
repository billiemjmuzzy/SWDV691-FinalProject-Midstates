import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Inventory } from '../inventory.model';
import { InventoriesService } from '../inventories.service';
import { AuthService } from "../../auth/auth.service";


@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})

export class InventoryViewComponent implements OnInit, OnDestroy {
  inventories: Inventory[] = [];
  isLoading = false;
  totalInventories = 0;
  inventoriesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 5, 10, 25];
  userIsAuthenticated = false;
  userId: string;
  private inventoriesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public inventoriesService: InventoriesService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoriesService.getInventories(this.inventoriesPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.inventoriesSub = this.inventoriesService
      .getInventoryUpdateListener()
      .subscribe((inventoryData: { inventories: Inventory[], inventoryCount: number }) => {
        this.isLoading = false;
        this.totalInventories = inventoryData.inventoryCount;
        this.inventories = inventoryData.inventories;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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
    this.authStatusSub.unsubscribe();

  }

};
