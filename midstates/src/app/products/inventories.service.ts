import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Inventory } from './inventory.model';

@Injectable({
  providedIn: 'root'
})

export class InventoriesService {
  private inventories: Inventory[] = [];
  private inventoriesUpdated = new Subject<Inventory[]>();

  constructor(private http: HttpClient) { }

  getInventories() {
    return this.http.get<{message: string, inventories: Inventory[] }>('http://localhost:3000/api/inventories')
      .subscribe((inventoryData) => {
        this.inventories = inventoryData.inventories;
        this.inventoriesUpdated.next([...this.inventories]);

      });
  }

  getInventoryUpdateListener() {
    return this.inventoriesUpdated.asObservable();
  }

  addInventory(image: string, brand: string, year: number, hours: number, condition: string, serial: string, price: number, description: string) {
    const inventory: Inventory = {id: null, image: image, brand: brand, year: year, hours: hours, condition: condition, serial: serial, price: price, description: description }
    this.inventories.push(inventory);
    this.inventoriesUpdated.next([...this.inventories]);
  }


}
