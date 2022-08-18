import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ToasterComponent } from './components/toaster/toaster.component';



@NgModule({
  declarations: [
    LoaderComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ] 
})
export class SharedModule { }
