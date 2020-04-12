import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  @Input() display : boolean;
  text: string;
  cities1: SelectItem[];
    
    cities2: any[];

    selectedCity1: any;
    
    selectedCity2: any;
  constructor() { }

  ngOnInit(): void {
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
