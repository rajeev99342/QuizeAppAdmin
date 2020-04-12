import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() display: boolean;
  @Output() sidebarEmitter: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    console.log('display sidebar',this.display)
  }

  onHideEvent(event)
  {
      console.log('on hide event',event);
      this.display = false;
      this.sidebarEmitter.emit(this.display);
  }

}
