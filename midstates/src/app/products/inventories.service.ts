import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inventory } from './inventory.model';

@Injectable({
  providedIn: 'root'
})

export class InventoriesService {
  private inventories: Inventory[] = [];
  private inventoriesUpdated = new Subject<Inventory[]>();

  constructor(private http: HttpClient) { }
  /**
   * Get Inventories:
   * Gets all Inventory items.
   */
  getInventories() {
    this.http.get<{ message: string, inventories: any }>(
      'http://localhost:3000/api/inventories'
    )
      .pipe(map((inventoryData) => {
        return inventoryData.inventories.map(inventory => {
          return {
            id: inventory._id,
            image: inventory.image,
            brand: inventory.brand,
            year: inventory.year,
            hours: inventory.hours,
            condition: inventory.condition,
            serial: inventory.serial,
            price: inventory.price,
            description: inventory.description,
            createdDate: inventory.createdDate
          };
        });
      }))
      .subscribe(transformedInventories => {
        this.inventories = transformedInventories;
        this.inventoriesUpdated.next([...this.inventories]);
      });
  }

  getInventoryUpdateListener() {
    return this.inventoriesUpdated.asObservable();
  }

  /**
   * Add Inventory:
   * Posts all inventory items
   * @param image -- string
   * @param brand string
   * @param year string
   * @param hours string
   * @param condition string
   * @param serial string
   * @param price string
   * @param description string
   */
  addInventory(image: string, brand: string, year: string, hours: string, condition: string, serial: string, price: string, description: string) {
    const inventory: Inventory = {
      id: null,
      image: image,
      brand: brand,
      year: year,
      hours: hours,
      condition: condition,
      serial: serial,
      price: price,
      description: description
    };
    this.http
      .post<{ message: string, inventoryId: string }>('http://localhost:3000/api/inventories', inventory)
      .subscribe(responseData => {
        const id = responseData.inventoryId;
        inventory.id = id;
        this.inventories.push(inventory);
        this.inventoriesUpdated.next([...this.inventories]);
      });
  }
  /**
   * Get single inventory item
   * @param {string} inventoryId  ID of Inventory Item
   */
  getInventory(inventoryId: string) {
    this.http.get("http://localhost:3000/api/inventories/" + inventoryId)
      .subscribe(() => {
        const updatedInventories = this.inventories.filter(inventory => inventory.id !== inventoryId);
        this.inventories = updatedInventories;
        this.inventoriesUpdated.next([...this.inventories]);
      });
  }

  /**
   * Deletes the inventory item
   * @param {string} inventoryId  ID of Inventory Item
   */
  deleteInventory(inventoryId: string) {
    this.http.delete("http://localhost:3000/api/inventories/" + inventoryId)
      .subscribe(() => {
        const updatedInventories = this.inventories.filter(inventory => inventory.id !== inventoryId);
        this.inventories = updatedInventories;
        this.inventoriesUpdated.next([...this.inventories]);
      });
  }
}
