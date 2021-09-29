import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TextClockService } from '../text-clock.service';

@Component({
  selector: 'app-clock-main',
  templateUrl: './clock-main.component.html',
  styleUrls: ['./clock-main.component.scss']
})
export class ClockMainComponent implements OnInit {

  private subscription: Subscription | undefined;
  public timeText: string = "";
  private currentTime: string = "";

  public constructor(private textClockService: TextClockService) { 
  }

  ngOnInit(): void {
    //emit value in sequence every 500 milisecond
    const source = interval(500);
    this.subscription = source.subscribe(val => this.updateTime());
  }

  private updateTime(): void{
    const now = formatDate(new Date(), 'HH:mm', 'en-US');
    if (this.currentTime == now) return;
    this.timeText = this.textClockService.getTextFromTime(now);
    if (this.timeText != "") this.currentTime = now;
    console.debug("now: " + now + " timeText: " + this.timeText);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
