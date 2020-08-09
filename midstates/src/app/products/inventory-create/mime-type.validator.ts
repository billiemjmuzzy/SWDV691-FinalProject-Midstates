import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof (control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  // file reader observable
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      // allows us to access the mime type
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          //builds string of hexadecimal values
          header += arr[i].toString(16);
        }
        // checking for png or jpeg files
        switch (header) {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};

// code based on https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10523224
