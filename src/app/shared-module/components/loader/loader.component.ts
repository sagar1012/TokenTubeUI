import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from "@angular/core";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() visible = true;
  visibleChangeValue: any;

  ngOnChanges() {
      this.visibleChange();
  }

  visibleChange() {
      this.visibleChangeValue = this.visible;
  }

}
