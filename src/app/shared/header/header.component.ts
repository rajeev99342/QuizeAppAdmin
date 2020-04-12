import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';
declare var $ : any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
  selectedCar: string;

  groupedCars: SelectItemGroup[];
  display : boolean = false;

  constructor() {
    this.groupedCars = [
      {
          label: 'Germany', 
          items: [
              {label: 'Audi', value: 'Audi'},
              {label: 'BMW', value: 'BMW'},
              {label: 'Mercedes', value: 'Mercedes'}
          ]
      },
      {
          label: 'USA', 
          items: [
              {label: 'Cadillac', value: 'Cadillac'},
              {label: 'Ford', value: 'Ford'},
              {label: 'GMC', value: 'GMC'}
          ]
      },
      {
          label: 'Japan', 
          items: [
              {label: 'Honda', value: 'Honda'},
              {label: 'Mazda', value: 'Mazda'},
              {label: 'Toyota', value: 'Toyota'}
          ]
      }
  ];
   }

  ngOnInit(): void {
  }

  clickNav() {
  
    }

    openSideBar()
    {
        if(this.display)
        {
            this.display = false;
        }else{
            this.display = true;
        }
    }

    sidebarEmitterFun(event)
    {
        console.log(event);
        this.display = event;
    }
}
