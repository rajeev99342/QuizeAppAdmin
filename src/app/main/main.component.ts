import { Component, OnInit } from '@angular/core';
import { QuestionsComponent } from './questions/questions.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  navigation_title : string;
  constructor() { }

  ngOnInit(): void {
  }
  openSidebar()
  {
    document.getElementById("mySidebar").style.display = "block";

  }
  
close() {
  document.getElementById("mySidebar").style.display = "none";
  
}
}
