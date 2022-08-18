import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  tabId: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.tabId = 1;
  }

  onClickTab(id: number) {
    this.tabId = id;
    $(".tablinks").removeClass("active");
    $("#tab" + id).addClass("active");
  }

}
