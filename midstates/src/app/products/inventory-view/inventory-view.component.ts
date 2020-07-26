import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent {

  elements: any = [
    {
      "image": "http://dummyimage.com/110x196.bmp/cc0000/ffffff",
      "brand": "aenean sit",
      "year": 2004,
      "hours": 554,
      "condition": "new",
      "serial": "4T1BF3EK7BU932948",
      "price": "$815.85",
      "description": "vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing"
    },
    {
      "image": "http://dummyimage.com/177x144.jpg/5fa2dd/ffffff",
      "brand": "id sapien",
      "year": 2007,
      "hours": 515,
      "condition": "new",
      "serial": "4T1BF3EKXAU261130",
      "price": "$11994.91",
      "description": "quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla"
    },
    {
      "image": "http://dummyimage.com/175x241.bmp/ff4444/ffffff",
      "brand": "neque",
      "year": 1999,
      "hours": 681,
      "condition": "used",
      "serial": "1D7RE2GK1BS938632",
      "price": "$5658.12",
      "description": "maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi"
    },
    {
      "image": "http://dummyimage.com/231x183.png/cc0000/ffffff",
      "brand": "ut ultrices",
      "year": 2003,
      "hours": 404,
      "condition": "used",
      "serial": "JM1NC2JF9B0021752",
      "price": "$11378.34",
      "description": "erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim"
    },
    {
      "image": "http://dummyimage.com/141x118.bmp/cc0000/ffffff",
      "brand": "congue eget",
      "year": 2002,
      "hours": 452,
      "condition": "used",
      "serial": "1G6AZ5SX8E0818359",
      "price": "$4955.61",
      "description": "tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis"
    },
    {
      "image": "http://dummyimage.com/103x152.jpg/ff4444/ffffff",
      "brand": "in porttitor",
      "year": 2003,
      "hours": 871,
      "condition": "used",
      "serial": "1FTEX1E84AK941699",
      "price": "$12566.82",
      "description": "luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis"
    },
    {
      "image": "http://dummyimage.com/212x107.png/dddddd/000000",
      "brand": "accumsan felis",
      "year": 1996,
      "hours": 846,
      "condition": "used",
      "serial": "WA1CV94L49D111450",
      "price": "$11988.61",
      "description": "proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget"
    },
    {
      "image": "http://dummyimage.com/232x123.png/cc0000/ffffff",
      "brand": "ut",
      "year": 2005,
      "hours": 688,
      "condition": "used",
      "serial": "YV440MBC7F1605942",
      "price": "$1852.63",
      "description": "eleifend luctus ultricies eu nibh quisque id justo sit amet"
    },
    {
      "image": "http://dummyimage.com/139x112.jpg/cc0000/ffffff",
      "brand": "in hac",
      "year": 2010,
      "hours": 103,
      "condition": "used",
      "serial": "1D7RB1CP9AS804289",
      "price": "$19518.64",
      "description": "congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec"
    }
  ]
  headElements = ['image', 'brand', 'year', 'hours', 'condition', 'serial', 'price', 'description'];

}
