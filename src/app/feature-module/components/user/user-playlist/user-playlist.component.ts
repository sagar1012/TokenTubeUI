import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

declare let $: any;
import * as myGlobals from "../../../../globals";


@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class UserPlaylistComponent implements OnInit {
  public playlistForm !: FormGroup;
  submitted: boolean = false;
  playlistData: any = [];

  private readonly notifier: NotifierService;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.playlistForm = this.formBuilder.group({
      playlist_title: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      playlist_visibility: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    });
  }

  get f() {
    return this.playlistForm.controls;
  }

  openVerticallyCentered(content: any) {
    this.playlistForm.reset();
    this.submitted = false;
    this.modalService.open(content, { centered: true });
  }

  playlistForms() {
    this.submitted = true;
    if (this.playlistForm.controls['playlist_title'].value == "" || this.playlistForm.controls['playlist_title'].value == null) {
      return;
    }
    else if (this.playlistForm.controls['playlist_visibility'].value == "" || this.playlistForm.controls['playlist_visibility'].value == null) {
      return;
    }
    else {
      /** spinner starts **/
      myGlobals.setLoadingData(true);

      this.http.post<any>("http://localhost:3000/posts", this.playlistForm.value)
        .subscribe(res => {
          this.notifier.notify('success', 'You banner added successfully');
          this.modalService.dismissAll();
          this.playlistForm.reset();
          this.submitted = false;

          this.http.get('http://localhost:3000/posts').subscribe(res => {
            this.playlistData = res;

            /** spinner ends **/
            setTimeout(() => { myGlobals.setLoadingData(false); }, 1000);
          })
        }, err => {
          this.notifier.notify('error', 'Errors while added banner details');
        });
    }

  }
}
