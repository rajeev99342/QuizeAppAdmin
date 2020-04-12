import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './interfaces/car';
import { UserServiceService } from './services/user-service.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  cars: any[];
  cols: any[];

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
  }

  filterData(event)
  {
    console.log(event)
  }

}
