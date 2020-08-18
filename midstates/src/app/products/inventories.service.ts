import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Inventory } from './inventory.model';

const BACKEND_URL = environment.apiUrl + "/inventories/";


@Injectable({
  providedIn: 'root'
})

export class InventoriesService {
  private inventories: Inventory[] = [];
  private inventoriesUpdated = new Subject<{inventories: Inventory[], inventoryCount: number}>();


  constructor(private http: HttpClient, private router: Router) { }
/**
 * Get all inventory items
 * @param inventoriesPerPage - number of inventory items per page
 * @param currentPage - current page the user is on
 */
  getInventories(inventoriesPerPage: number, currentPage: number ) {
    const queryParams = `?pagesize=${inventoriesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string, inventories: any, maxInventories: number }>(
        BACKEND_URL + queryParams)
      .pipe(
        map(inventoryData => {
          return {
            inventories: inventoryData.inventories.map(inventory => {
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
              creator: inventory.creator,
              createdDate: inventory.createdDate
            };
          }),
            maxInventories: inventoryData.maxInventories
          };
        })
      )
      .subscribe(transformedInventoriesData => {
        console.log(transformedInventoriesData);
        this.inventories = transformedInventoriesData.inventories;
        this.inventoriesUpdated.next({
          inventories: [...this.inventories],
          inventoryCount: transformedInventoriesData.maxInventories
        });
      });
  }

  getInventoryUpdateListener() {
    return this.inventoriesUpdated.asObservable();
  }

  getInventory(id: string) {
    return this.http.get<{
      _id: string,
      imagePath: string,
      brand: string,
      year: string,
      hours: string,
      condition: string,
      serial: string,
      price: string,
      description: string,
      creator: string
    }>(BACKEND_URL + id);
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
        BACKEND_URL,
        inventoryData
      )
      .subscribe(responseData => {
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
    image: File | string,
    brand: string,
    year: string,
    hours: string,
    condition: string,
    serial: string,
    price: string,
    description: string) {
    let inventoryData: Inventory | FormData;
    if (typeof image === "object") {
      inventoryData = new FormData();
      inventoryData.append("id", id);
      inventoryData.append("image", image, brand);
      inventoryData.append("year", year);
      inventoryData.append("hours", hours);
      inventoryData.append("condition", condition);
      inventoryData.append("serial", serial);
      inventoryData.append("price", price);
      inventoryData.append("description", description);
    } else {
      inventoryData= {
        id: id,
        imagePath: image,
        brand: brand,
        year: year,
        hours: hours,
        condition: condition,
        serial: serial,
        price: price,
        description: description,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL + id, inventoryData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }


  deleteInventory(inventoryId: string) {
    return this.http
      .delete("BACKEND_URL/" + inventoryId)
  }
}
