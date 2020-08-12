import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  isLoading = false

  onNewUser(form: NgForm) {
    console.log(form.value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
