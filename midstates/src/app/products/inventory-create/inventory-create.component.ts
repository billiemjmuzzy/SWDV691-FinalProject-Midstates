import { Component, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms"
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { humanizeBytes } from 'ng-uikit-pro-standard';
import { InventoriesService } from '../inventories.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent {
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  enteredImage = '';
  enteredBrand = '';
  enteredYear = 0;
  enteredHours = 0;
  enteredCondition = '';
  enteredSerial = '';
  enteredPrice = 0;
  enteredDescription = '';

  constructor(public inventoriesService: InventoriesService) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  onAddInventory(form: NgForm) {
     //prevents form submission if invalid
     if (form.invalid) {
      return;
    }


    this.inventoriesService.addInventory(form.value.image, form.value.brand, form.value.year, form.value.hours, form.value.condition, form.value.serial, form.value.price, form.value.description);

  }

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
