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
  headElements = ['image', 'brand', 'year', 'hours', 'condition', 'serial', 'price', 'description'];

  inventories: Inventory[] = [];
  private inventoriesSub: Subscription;


  constructor(public inventoriesService: InventoriesService) { }

  ngOnInit() {
    this.inventories = this.inventoriesService.getInventories();

    // create subscription
    this.inventoriesSub = this.inventoriesService.getInventoryUpdateListener()
      .subscribe((inventories: Inventory[]) => {
        this.inventories = inventories;

      });
  }
  ngOnDestroy() {
    // removes subscription and prevents memory links
    this.inventoriesSub.unsubscribe();

  }

}
