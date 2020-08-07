import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { humanizeBytes } from 'ng-uikit-pro-standard';
import { InventoriesService } from '../inventories.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Inventory } from '../inventory.model';


@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {
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
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  private mode = "create";
  private inventoryId: string;

  constructor(
    public inventoriesService: InventoriesService,
    public route: ActivatedRoute) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {

    this.form = new FormGroup({
      brand: new FormControl(null, {
        validators: [Validators.required]
      }),
      year: new FormControl(null, {
        validators: [Validators.required]
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
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('inventoryId')) {
        this.mode = 'edit';
        this.inventoryId = paramMap.get('inventoryId');
        this.isLoading = true;
        this.inventoriesService.getInventory(this.inventoryId).subscribe(inventoryData => {
          this.isLoading = false;
          this.inventory = {
            id: inventoryData._id,
            image: inventoryData.image,
            brand: inventoryData.brand,
            year: inventoryData.year,
            hours: inventoryData.hours,
            condition: inventoryData.condition,
            serial: inventoryData.serial,
            price: inventoryData.price,
            description: inventoryData.description
          };
          this.form.setValue({
            'image': this.inventory.brand,
            'year': this.inventory.year,
            'hours': this.inventory.hours,
            'condition': this.inventory.condition,
            'serial': this.inventory.serial,
            'price': this.inventory.price,
            'description': this.inventory.description
          });
        });
      } else {
        this.mode == "create";
        this.inventoryId = null;
      }
    });
  }
  /**
   * Adds a new inventory item and
   * saves it to the database.
   * @param form
   */
  onSaveInventory() {
    //prevents form submission if invalid
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'edit') {
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
    } else {
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
    }
    this.form.reset();
  }
  //upload files
  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'your-path-to-backend-endpoint',
      method: 'POST',
      data: { foo: 'bar' },
    };
    this.files = [];
    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  onUploadOutput(output: UploadOutput | any): void {

    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }

}
