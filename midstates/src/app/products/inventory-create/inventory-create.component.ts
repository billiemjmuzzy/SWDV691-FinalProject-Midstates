import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"


import { InventoriesService } from '../inventories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Inventory } from '../inventory.model';
import { mimeType } from "./mime-type.validator";


@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit, OnDestroy {
  enteredImage = '';
  enteredBrand = '';
  enteredYear = '';
  enteredHours = '';
  enteredCondition = '';
  enteredSerial = '';
  enteredPrice = '';
  enteredDescription = '';
  inventory: Inventory;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private inventoryId: string;
  private authStatusSub: Subscription;

  constructor(
    public inventoriesService: InventoriesService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      brand: new FormControl(null, {
        validators: [Validators.required]
      }),
      year: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('^\\d{4}$')]
      }),
      hours: new FormControl(null, {
        validators: [Validators.required]
      }),
      condition: new FormControl(null, {
        validators: [Validators.required]
      }),
      serial: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("inventoryId")) {
        this.mode = "edit";
        this.inventoryId = paramMap.get("inventoryId");
        this.isLoading = true;
        this.inventoriesService.getInventory(this.inventoryId).subscribe(inventoryData => {
          this.isLoading = false;
          this.inventory = {
            id: inventoryData._id,
            imagePath: inventoryData.imagePath,
            brand: inventoryData.brand,
            year: inventoryData.year,
            hours: inventoryData.hours,
            condition: inventoryData.condition,
            serial: inventoryData.serial,
            price: inventoryData.price,
            description: inventoryData.description,
            creator: inventoryData.creator
          };
          this.form.setValue({
            image: this.inventory.imagePath,
            brand: this.inventory.brand,
            year: this.inventory.year,
            hours: this.inventory.hours,
            condition: this.inventory.condition,
            serial: this.inventory.serial,
            price: this.inventory.price,
            description: this.inventory.description
          });
        });
      } else {
        this.mode == "create";
        this.inventoryId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);

  }

  onSaveInventory() {
    //prevents form submission if invalid
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.inventoriesService.addInventory(
        this.form.value.image,
        this.form.value.brand,
        this.form.value.year,
        this.form.value.hours,
        this.form.value.condition,
        this.form.value.serial,
        this.form.value.price,
        this.form.value.description
      );
    } else {
      this.inventoriesService.updateInventory(
        this.inventoryId,
        this.form.value.image,
        this.form.value.brand,
        this.form.value.year,
        this.form.value.hours,
        this.form.value.condition,
        this.form.value.serial,
        this.form.value.price,
        this.form.value.description
      );
    }
    this.form.reset();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
