import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { Inventory } from './inventory.model';


@Injectable({
  providedIn: 'root'
})

export class InventoriesService {
  private inventories: Inventory[] = [];
  private inventoriesUpdated = new Subject<Inventory[]>();


  constructor(private http: HttpClient, private router: Router) { }
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
            imagePath: inventory.imagePath,
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
   * Get a single inventory item
   * @param id
   */
  getInventory(id: string) {
    return this.http.get<{
      _id: string,
      image: string,
      brand: string,
      year: string,
      hours: string,
      condition: string,
      serial: string,
      price: string,
      description: string
    }>("http://localhost:3000/api/inventories/" + id);
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
  addInventory(
    image: File,
    brand: string,
    year: string,
    hours: string,
    condition: string,
    serial: string,
    price: string,
    description: string) {
    const inventoryData = new FormData();
    inventoryData.append("image", image, brand);
    inventoryData.append("brand", brand);
    inventoryData.append("year", year);
    inventoryData.append("hours", hours);
    inventoryData.append("condition", condition);
    inventoryData.append("serial", serial);
    inventoryData.append("price", price);
    inventoryData.append("description", description);
    this.http
      .post<{ message: string, inventory: Inventory }>(
        "http://localhost:3000/api/inventories",
        inventoryData
      )
      .subscribe(responseData => {
        const inventory: Inventory = {
          id: responseData.inventory.id,
          imagePath: responseData.inventory.imagePath,
          brand: brand,
          year: year,
          hours: hours,
          condition: condition,
          serial: serial,
          price: price,
          description: description
        };
        this.inventories.push(inventory);
        this.inventoriesUpdated.next([...this.inventories]);
        this.router.navigate(["/"])
      });
  }
  /**
   * Update Inventory:
   * Update a inventory item
   * @param id --id of inventory item
   * @param image
   * @param brand
   * @param year
   * @param hours
   * @param condition
   * @param serial
   * @param price
   * @param description
   */
  updateInventory(
    id: string,
    brand: string,
    year: string,
    hours: string,
    condition: string,
    serial: string,
    price: string,
    description: string) {
    const inventory: Inventory = {
      id: id,
      imagePath: null,
      brand: brand,
      year: year,
      hours: hours,
      condition: condition,
      serial: serial,
      price: price,
      description: description
    };
    this.http
      .put("http://localhost:3000/api/inventories/" + id, inventory)
      .subscribe(response => {
        const updatedInventories = [...this.inventories];
        const oldInventoryIndex = updatedInventories.findIndex(i => i.id === inventory.id);
        updatedInventories[oldInventoryIndex] = inventory;
        this.inventories = updatedInventories;
        this.inventoriesUpdated.next([...this.inventories]);
        this.router.navigate(["/"]);
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
