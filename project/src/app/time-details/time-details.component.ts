import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimeService } from '../service/time.service';

@Component({
  selector: 'app-time-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-details.component.html',
  styleUrl: './time-details.component.css'
})
export class TimeDetailsComponent implements OnInit {

  showMore: boolean = false;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeService.getZone().subscribe();
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

}
