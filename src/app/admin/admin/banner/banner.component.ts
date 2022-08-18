import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

declare let $: any;
import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class BannerComponent implements OnInit {
  bannerId: number = 0;
  public bannerForm !: FormGroup;
  submitted: boolean = false;
  positionSelectedValue:number = 0;
  statusSelectedValue:number = 0;
  bannerImage: string = "";
  bannerData:any = [];

  private readonly notifier: NotifierService;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/banner').subscribe(res => {
      this.bannerData = res;
      
      /** spinner starts **/
      myGlobals.setLoadingData(true);
    }); 

    setTimeout(() => { 
      $(document).ready(function () {
        $('#dtBanner').DataTable();
        $('.dataTables_length').addClass('bs-select');
      }); 
    }, 1000);

    this.bannerForm = this.formBuilder.group({
      banner_title: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      banner_image: new FormControl(null, [Validators.required]),
      banner_imagepath: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      banner_imagename: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      banner_position: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      banner_status: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      banner_description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    });
    
    /** spinner ends **/
    setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
  }

  get f() {
    return this.bannerForm.controls;
  }

  openVerticallyCentered(content: any) {
    this.bannerForm.reset();
    this.submitted = false;
    this.bannerForm.controls['banner_position'].setValue(this.positionSelectedValue);
    this.bannerForm.controls['banner_status'].setValue(this.statusSelectedValue);
    this.modalService.open(content, { centered: true });
  }

  editBanner(content: any, id:number) {
    this.bannerForm = this.formBuilder.group(this.bannerData[id-1]);
    this.bannerId = id;
    this.bannerForm.controls['banner_image'].setValue(null);
    this.bannerForm.controls['banner_imagename'].setValue(null);
    this.modalService.open(content, { centered: true });
  }

  deleteBanner(id:number) {
    /** spinner starts **/
    myGlobals.setLoadingData(true);

    this.http.delete<any>("http://localhost:3000/banner/"+id).subscribe(res => {
          this.notifier.notify('success', 'Your banner details has been deleted successfully');          
          this.submitted = false;
    }, err => {
      this.notifier.notify('error', 'Errors while deleting banner details');
    });

    this.http.get('http://localhost:3000/banner').subscribe(res => {
      /** spinner ends **/
      setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
      this.dataTable(res);
    });
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    this.submitted = false;
    if (file) {
      let imagePath = "C:/Skyttus Projects/new-tokentube/src/app/admin/assets/images/";
      this.bannerImage = file.name;
      this.bannerForm.controls['banner_imagepath'].setValue(imagePath);
      this.bannerForm.controls['banner_imagename'].setValue(this.bannerImage);

      // let formData = new FormData();
      // const headers = new HttpHeaders();
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // let photo = file;      
       
      // formData.append("image", photo);

      // /* Image Post Request */
      // this.http.post('http://localhost/upload.php', formData, {
      // headers: headers
      // }).subscribe(data => {
      //   //Check success message
      //   console.log(data);
      // });  
    
    } else {
      return;
    }
  }

  dataTable(res: any) {
    $('#dtBanner').dataTable().fnDestroy();
    this.bannerData = res;
    setTimeout(() => { 
      $('#dtBanner').DataTable();
      $('.dataTables_length').addClass('bs-select');
    }, 1000);
  }

  bannerForms(id: any) {
    this.submitted = true;
    if (this.bannerForm.controls['banner_title'].value == "" || this.bannerForm.controls['banner_title'].value == null) {
      return;
    }
    else if (this.bannerForm.controls['banner_image'].value == "" || this.bannerForm.controls['banner_image'].value == null) {
      this.notifier.notify('error', 'Banner image is required');
      return;
    }
    else if (this.bannerForm.controls['banner_position'].value == "" || this.bannerForm.controls['banner_position'].value == null) {
      return;
    }
    else if (this.bannerForm.controls['banner_status'].value == "" || this.bannerForm.controls['banner_status'].value == null) {
      return;
    }
    else if (this.bannerForm.controls['banner_description'].value == "" || this.bannerForm.controls['banner_description'].value == null) {
      return;
    }
    else {
      /** spinner starts **/
      myGlobals.setLoadingData(true);

      if(id == 0 ) {
        this.http.post<any>("http://localhost:3000/banner", this.bannerForm.value).subscribe(res => {
          this.notifier.notify('success', 'You banner details added successfully');
          this.modalService.dismissAll();
          this.submitted = false;
          this.bannerForm.reset();
        }, err => {
          this.notifier.notify('error', 'Errors while adding banner details');
        });
      } else {
        this.http.put<any>("http://localhost:3000/banner/"+id, this.bannerForm.value).subscribe(res => {
          this.notifier.notify('success', 'You banner details have been saved successfully');
          this.modalService.dismissAll();
          this.submitted = false;
          this.bannerForm.reset();
        }, err => {
          this.notifier.notify('error', 'Errors while saving banner details');
        });
      }

      this.http.get('http://localhost:3000/banner').subscribe(res => {
        /** spinner ends **/
        setTimeout(() => { myGlobals.setLoadingData(false) }, 1000);
        this.dataTable(res);
      });
    }
    
  }

}
