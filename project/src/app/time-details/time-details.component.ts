import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Details, time, TimeService } from '../service/time.service';

@Component({
  selector: 'app-time-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-details.component.html',
  styleUrl: './time-details.component.css'
})
export class TimeDetailsComponent implements OnInit {

  showMore: boolean = false;
  theme: string = '';


  public time: time = { hour: "00", minute: "00" };
  public currentZone: string = 'Lisbon, Pt';
  public details: Details = {
    entryMessage: 'Good Morning',
    currentTimezone: 'Europe/Lisbon',
    dayOfYear: 0,
    dayOfWeek: 0,
    weekNumber: 0
  };

  constructor(private timeService: TimeService) {
    this.timeService.time$.subscribe(time => {
      this.time = time;
    });
    this.timeService.currentZone$.subscribe(zone => {
      this.currentZone = zone;
    });
    this.timeService.details$.subscribe(details => {
      this.details = details;
      if (this.details.entryMessage == "Good Evening") {
        this.theme = 'night-time';
      }
    });
    this.timeService.showMore$.subscribe(showMore => {
      this.showMore = showMore;
    });
  }

  ngOnInit(): void {
    this.timeService.getZone().subscribe();
  }

  toggleShowMore() {
    this.timeService.toggleShowMore();
  }

}
