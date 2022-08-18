import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-personlize',
  templateUrl: './personlize.component.html',
  styleUrls: ['./personlize.component.scss']
})
export class PersonlizeComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;

  }

  ngOnInit(): void {
  }

  savechange() {

    this.notifier.notify('success', 'Personal Data Saved Successfully');
  }
  error() {
    this.notifier.notify('error', 'Please select file');
  }
}
