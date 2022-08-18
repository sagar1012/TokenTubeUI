import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare let $: any;

@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.scss']
})
export class ShortsComponent implements OnInit {
  pause: boolean = false;
  play: boolean = true;
  mute: boolean = true;
  unmute: boolean = false;

  constructor(private modalService: NgbModal) { }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {
    $("video").prop('muted', true);
    this.mute = true;
  }

  pauseVid(myVideo: any) {
    $("#" + myVideo)[0].pause();;
    this.pause = true;
    this.play = false;
  }

  playVid(myVideo: any) {
    $("#" + myVideo)[0].play();
    this.pause = false;
    this.play = true;
  }

  muteVid(myVideo: any) {
    $("#" + myVideo).prop('muted', true);
    this.mute = true;
    this.unmute = false;
  }

  unmuteVid(myVideo: any) {
    $("#" + myVideo).prop('muted', false);
    this.mute = false;
    this.unmute = true;
  }

}
