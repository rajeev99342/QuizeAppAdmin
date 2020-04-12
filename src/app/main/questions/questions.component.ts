import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  cars: any[];
  cols: any[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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

}
