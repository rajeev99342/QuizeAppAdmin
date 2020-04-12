import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../users/services/user-service.service';
import { SelectItem } from 'primeng/api/';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  cars: any[];
  cols: any[];
  cities2: City[];
  cities1: SelectItem[];

  selectedCity1: any;
  
  selectedCity2: City;

  constructor(private http: HttpClient,private carService: UserServiceService) { }

  ngOnInit() {
    
      this.http.get("/assets/json/users.json").subscribe((data)=>{
          console.log('data->',data);
          this.cars = data["data"];
      })
    
      this.cols = [
        { field: 'Name', header: 'Name' },
        { field: 'Class', header: 'Class' },
        { field: 'Join', header: 'Join Date' },
        { field: 'Status', header: 'Status' }
    ];

    
    //An array of cities
    this.cities2 = [
      {name: 'Coaching', code: 'NY'},
      {name: 'School', code: 'RM'},
      {name: 'Collage', code: 'RM2'},
    
     
    ];
  }

  filterData(event)
  {
    console.log(event)
  }

  onFilterTopic()
  {
    console.log(this.selectedCity1)
  }
}
