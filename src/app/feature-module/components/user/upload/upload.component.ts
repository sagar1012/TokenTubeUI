import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public uploadForm !: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      channel_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      Video_Title: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      videoFile: new FormControl(null, [Validators.required]),
      thumbImg: new FormControl(null, [Validators.required]),
      playlist: new FormControl(null, [Validators.required]),
      visibility: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      lang: new FormControl(null, [Validators.required]),

    })
  }

  get f() {
    return this.uploadForm.controls;
  }


  uploadForms() {
    this.submitted = true;

    // if (this.uploadForm.controls['channel_name'].value == "" || this.uploadForm.controls['channel_name'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['Video_Title'].value == "" || this.uploadForm.controls['Video_Title'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['description'].value == "" || this.uploadForm.controls['description'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['videoFile'].value == "" || this.uploadForm.controls['videoFile'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['thumbImg'].value == "" || this.uploadForm.controls['thumbImg'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['playlist'].value == "" || this.uploadForm.controls['playlist'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['visibility'].value == "" || this.uploadForm.controls['visibility'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['category'].value == "" || this.uploadForm.controls['category'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['tag'].value == "" || this.uploadForm.controls['tag'].value == null) {
    //   return;
    // }
    // else if (this.uploadForm.controls['lang'].value == "" || this.uploadForm.controls['lang'].value == null) {
    //   return;
    // }
  }
}
