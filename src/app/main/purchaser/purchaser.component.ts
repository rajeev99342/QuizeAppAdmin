import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api/';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-purchaser',
  templateUrl: './purchaser.component.html',
  styleUrls: ['./purchaser.component.css']
})
export class PurchaserComponent implements OnInit {

  cities1: SelectItem[];
    
    cities2: City[];

    selectedCity1: any;
    
    selectedCity2: City;
  cars: any[];
  cols: any[];
  constructor(private http: HttpClient) { }

 
  ngOnInit(): void {
    this.http.get("/assets/json/classes.json").subscribe((data)=>{
      console.log('data->',data);
      this.cars = data["data"];
  })

  this.cols = [
    { field: 'Class', header: 'Class' },
    { field: 'Subject', header: 'No of sub' },
    { field: 'User', header: 'No of user' },
    { field: 'Dummy', header: 'Dummy' }
];

this.cities1 = [
  {label:'Select City', value:null},
  {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
  {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
  {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
  {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
  {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
];

//An array of cities
this.cities2 = [
  {name: 'Coaching', code: 'NY'},
  {name: 'School', code: 'RM'},
  {name: 'Collage', code: 'RM2'},

 
];
  }


  onSelectPurchaser()
  {
    console.log(this.selectedCity1)
  }



}
