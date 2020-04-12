import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

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
  }

}
