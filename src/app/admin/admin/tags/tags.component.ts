import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

declare let $: any;
import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class TagsComponent implements OnInit {
  tagId: number = 0;
  public tagForm !: FormGroup;
  submitted: boolean = false;
  categorySelectedValue:number = 0;
  tagData:any = [];
  categoryData:any = [];

  private readonly notifier: NotifierService;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/tag').subscribe(res => {
      this.tagData = res;
      
      /** spinner starts **/
      myGlobals.setLoadingData(true);
    }); 

    this.http.get('http://localhost:3000/category').subscribe(res => {
      // console.log('res', res);
      this.categoryData = res;
    }); 

    setTimeout(() => { 
      $(document).ready(function () {
        $('#dtTags').DataTable();
        $('.dataTables_length').addClass('bs-select');
      }); 
    }, 1000);

    this.tagForm = this.formBuilder.group({
      tag_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      tag_category: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    });

    /** spinner ends **/
    setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
  }

  get f() {
    return this.tagForm.controls;
  }

  openVerticallyCentered(content: any) {
    this.tagForm.reset();
    this.submitted = false;
    this.tagForm.controls['tag_category'].setValue(this.categorySelectedValue);
    this.modalService.open(content, { centered: true });
  }

  editTag(content: any, id:number) {
    this.tagForm = this.formBuilder.group(this.tagData[id-1]);
    this.tagId = id;
    this.modalService.open(content, { centered: true });
  }

  deleteTag(id:number) {
    /** spinner starts **/
    myGlobals.setLoadingData(true);

    this.http.delete<any>("http://localhost:3000/tag/"+id).subscribe(res => {
          this.notifier.notify('success', 'Your tag details has been deleted successfully');
          this.submitted = false;
    }, err => {
      this.notifier.notify('error', 'Errors while deleting tag details');
    });

    this.http.get('http://localhost:3000/tag').subscribe(res => {
      /** spinner ends **/
      setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
      this.dataTable(res);
    });
  }

  dataTable(res: any) {
    $('#dtTags').dataTable().fnDestroy();
    this.tagData = res;
    setTimeout(() => { 
      $('#dtTags').DataTable();
      $('.dataTables_length').addClass('bs-select');
    }, 1000);
  }

  tagForms(id: any) {
    this.submitted = true;
    if (this.tagForm.controls['tag_name'].value == "" || this.tagForm.controls['tag_name'].value == null) {
      return;
    }
    else if (this.tagForm.controls['tag_category'].value == "" || this.tagForm.controls['tag_category'].value == null) {
      return;
    }
    else {
      /** spinner starts **/
      myGlobals.setLoadingData(true);

      if(id == 0) {
        this.http.post<any>("http://localhost:3000/tag", this.tagForm.value).subscribe(res => {
          this.notifier.notify('success', 'You tag details added successfully');
          this.modalService.dismissAll();
          this.submitted = false;
          this.tagForm.reset();
        }, err => {
          this.notifier.notify('error', 'Errors while adding tag details');
        });
      } else {
        this.http.put<any>("http://localhost:3000/tag/"+id, this.tagForm.value).subscribe(res => {
          this.notifier.notify('success', 'Your tag details saved successfully');
          this.modalService.dismissAll();
          this.submitted = false;
          this.tagForm.reset();
        }, err => {
          this.notifier.notify('error', 'Errors while saving tag details');
        });
      }

      this.http.get('http://localhost:3000/tag').subscribe(res => {
        /** spinner ends **/
        setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
        this.dataTable(res);
      });
    }
  }

}
