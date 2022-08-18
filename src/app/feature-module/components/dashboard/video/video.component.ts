import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  dropdownMenu: boolean = false;
  likeClicked: boolean = false
  likeCount: number = 0;
  dislikeClicked: boolean = false
  dislikeCount: number = 0;
  likeCounter: number = 0;
  dislikeCounter: number = 0;

  constructor() { }

  @ViewChild('widgetsContent') widgetsContent!: ElementRef;

  ngOnInit(): void {
  }

  dropdownOpen() {
    if (this.dropdownMenu == false) {
      this.dropdownMenu = true;
    } else {
      this.dropdownMenu = false;
    }
  }

  like() {
    if (this.likeCounter >= 1) {
      this.likeCounter = 0;

      if (this.likeCount > 0)
        this.likeCount--;

      this.likeClicked = false;
      this.dislikeClicked = false;
    } else {
      this.likeCount++;
      this.likeCounter++;

      if (this.dislikeCount > 0)
        this.dislikeCount--;

      this.likeClicked = true;
      this.dislikeClicked = false;
    }
  }

  disLike() {
    if (this.dislikeCounter >= 1) {
      this.dislikeCounter = 0;

      if (this.dislikeCount > 0)
        this.dislikeCount--;

      this.dislikeClicked = false;
      this.likeClicked = false;

    } else {
      this.dislikeCount++;
      this.dislikeCounter++;

      if (this.likeCount > 0)
        this.likeCount--;

      this.dislikeClicked = true;
      this.likeClicked = false;
    }
  }

  likeDislike(item: any) {
    if (item == 'like') {
      this.likeCounter = this.likeCounter + 1;
    }
    if (item == 'dislike') {
      this.dislikeCounter = this.dislikeCounter + 1;
    }
  }


  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

}
