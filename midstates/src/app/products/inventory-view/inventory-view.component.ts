import { Component, OnInit, OnDestroy, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';

import { Inventory } from '../inventory.model';
import { InventoriesService } from '../inventories.service';

/**
 * Inventory view component.
 */
@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  headElements = ['image', 'brand', 'year', 'hours', 'condition', 'serial', 'price', 'description'];

  inventories: Inventory[] = [];
  private inventoriesSub: Subscription;

  searchText: string = '';
  previous: string;
  maxVisibleItems: number = 10;

  constructor(public inventoriesService: InventoriesService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.inventoriesService.getInventories();
    // create subscription to get inventory data
    this.inventoriesSub = this.inventoriesService.getInventoryUpdateListener()
      .subscribe((inventories: Inventory[]) => {
        this.inventories = inventories;
      });

    //populates data in the table if there are less than 25 rows
    for (let i = 1; i <= 25; i++) {
      this.inventories.push({
        id: 'ID',
        image: 'Image' + i,
        brand: 'Brand' + i,
        year: 'Year ' + i,
        hours: 'Hours ' + i,
        condition: 'Condition' + i,
        serial: 'Serial' + i,
        price: 'Price' + i,
        description: 'Description' + i
      });
    }

    this.mdbTable.setDataSource(this.inventories);
    this.inventories = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource()
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

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  addNewRow() {
    this.mdbTable.addRow({
      image: 'Image' + this.inventories.length,
      brand: 'Brand' + this.inventories.length,
      year: 'Year' + this.inventories.length,
      hours: 'Hours' + this.inventories.length,
      condition: 'Condition' + this.inventories.length,
      serial: 'Serial' + this.inventories.length,
      price: 'Price' + this.inventories.length,
      description: 'Description' + this.inventories.length
    });
    this.emitDataSourceChange();
  }
  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, { id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy' });
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.inventories = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.inventories = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['brand', 'year']);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });

  }
};
