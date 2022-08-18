import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  @ViewChild('widgetsContent1') widgetsContent1!: ElementRef;
  @ViewChild('widgetsContent2') widgetsContent2!: ElementRef;
  screenWidth: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.screenWidth = screen.width;
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 600;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 600;
  }

  scrollLeft1() {
    this.widgetsContent1.nativeElement.scrollLeft -= 600;
  }

  scrollRight1() {
    this.widgetsContent1.nativeElement.scrollLeft += 600;
  }

  scrollLeft2() {
    this.widgetsContent2.nativeElement.scrollLeft -= 600;
  }

  scrollRight2() {
    this.widgetsContent2.nativeElement.scrollLeft += 600;
  }

}
