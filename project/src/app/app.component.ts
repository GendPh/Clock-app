import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { TimeDetailsComponent } from './time-details/time-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuoteComponent, TimeDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
