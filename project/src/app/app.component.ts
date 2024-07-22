import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { TimeDetailsComponent } from './time-details/time-details.component';
import { TimeService } from './service/time.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuoteComponent, TimeDetailsComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  darkTheme: boolean = false;
  
  constructor(private timeService: TimeService) { 
    this.timeService.details$.subscribe(details => {
      if (details.entryMessage === 'Good Evening') {
        this.darkTheme = true;
      }
    });
  }

  title = 'project';
}
