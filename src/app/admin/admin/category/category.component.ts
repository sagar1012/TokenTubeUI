import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

const FILTER_PAG_REGEX = /[^0-9]/g;
declare let $: any;
import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CategoryComponent implements OnInit {
  closeResult: string = "";
  page = 1;

  categoryId: number = 0;
  public categoryForm !: FormGroup;
  submitted: boolean = false;
  categoryData:any = [];

  private readonly notifier: NotifierService;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/category').subscribe(res => {      
      this.categoryData = res;

      /** spinner starts **/
      myGlobals.setLoadingData(true);
    });

    setTimeout(() => { 
      $(document).ready(function () {
        $('#dtCategory').DataTable();
        $('.dataTables_length').addClass('bs-select');
      });
    }, 1000);

    this.categoryForm = this.formBuilder.group({
      category_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      category_slug: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      category_type: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      category_description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    });

    /** spinner ends **/
    setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
  }

  get f() {
    return this.categoryForm.controls;
  }

  openVerticallyCentered(content: any) {
    this.categoryForm.reset();
    this.submitted = false;
    this.modalService.open(content, { centered: true });
  }

  editCategory(content: any, id:number) {
    this.categoryForm = this.formBuilder.group(this.categoryData[id-1]);
    this.categoryId = id;
    this.modalService.open(content, { centered: true });
  }

  deleteCategory(id:number) {
    /** spinner starts **/
    myGlobals.setLoadingData(true);

    this.http.delete<any>("http://localhost:3000/category/"+id).subscribe(res => {
          this.notifier.notify('success', 'Your category details has been deleted successfully');          
          this.submitted = false;
    }, err => {
      this.notifier.notify('error', 'Errors while deleting category details');
    });

    this.http.get('http://localhost:3000/category').subscribe(res => {
      /** spinner ends **/
      setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
      this.dataTable(res);
    });
  }

  dataTable(res: any) {
    $('#dtCategory').dataTable().fnDestroy();
    this.categoryData = res;
    setTimeout(() => { 
      $('#dtCategory').DataTable();
      $('.dataTables_length').addClass('bs-select');
    }, 1000);
  }

  categoryForms(id: any) {
    this.submitted = true;
    if (this.categoryForm.controls['category_name'].value == "" || this.categoryForm.controls['category_name'].value == null) {
      return;
    }
    else if (this.categoryForm.controls['category_slug'].value == "" || this.categoryForm.controls['category_slug'].value == null) {
      return;
    }
    else if (this.categoryForm.controls['category_type'].value == "" || this.categoryForm.controls['category_type'].value == null) {
      return;
    }
    else if (this.categoryForm.controls['category_description'].value == "" || this.categoryForm.controls['category_description'].value == null) {
      return;
    }
    else {
      /** spinner starts **/
      myGlobals.setLoadingData(true);
      
      if(id == 0 ) {
        this.http.post<any>("http://localhost:3000/category/", this.categoryForm.value).subscribe(res => {
          this.notifier.notify('success', 'Your category details added successfully');
          this.modalService.dismissAll();
          this.submitted = false;
          this.categoryForm.reset();
        }, err => {
          this.notifier.notify('error', 'Errors while added category details');
        });
      } else {
        this.http.put<any>("http://localhost:3000/category/"+id, this.categoryForm.value).subscribe(res => {
          this.notifier.notify('success', 'Your category details have been saved successfully');
          this.modalService.dismissAll();
          this.submitted = false;
          this.categoryForm.reset();
        }, err => {
          this.notifier.notify('error', 'Errors while saving category details');
        });
      }

      this.http.get('http://localhost:3000/category').subscribe(res => {
        /** spinner ends **/
        setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
        this.dataTable(res);
      });
    }
    
  }

  // getPageSymbol(current: number) {
  //   return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  // }

  // selectPage(page: string) {
  //   this.page = parseInt(page, 10) || 1;
  // }

  // formatInput(input: HTMLInputElement) {
  //   input.value = input.value.replace(FILTER_PAG_REGEX, '');
  // }

}
