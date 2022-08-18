import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

declare let $: any;
import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {
  public bannerForm !: FormGroup;
  submitted: boolean = false;
  positionSelectedValue:number = 0;
  statusSelectedValue:number = 0;
  bannerImage: string = "";
  bannerData:any = [];

  private readonly notifier: NotifierService;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
    /** spinner starts **/
    myGlobals.setLoadingData(true);
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#dtVideos').DataTable();
      $('.dataTables_length').addClass('bs-select');
    });

    /** spinner ends **/
    setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
  }

}
