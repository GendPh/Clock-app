import { Component, OnInit } from '@angular/core';
import { Quote, QuoteService } from '../service/quote.service';
import { CommonModule } from '@angular/common';
import { TimeService } from '../service/time.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent implements OnInit {

  public loadingQuote: boolean = true;
  public quote: Quote | undefined;

  public moreShown: boolean = false;

  public clickReload: boolean = true;

  constructor(private quoteService: QuoteService, private timeService: TimeService) {
    this.timeService.showMore$.subscribe(showMore => {
      this.moreShown = showMore;
    });
  }

  ngOnInit(): void {
    this.loadQuote();
  }

  loadQuote() {
    this.loadingQuote = true;
    this.clickReload = true;

    this.quoteService.loadQuote().subscribe(
      {
        next: (quote) => {
          this.quote = quote[0];
        },
        error: (error: Error) => {
          const failQuote: Quote = {
            quote: error.message,
            author: 'Admin',
            category: 'Error'
          }
          this.quote = failQuote;
        },
        complete: () => {
          this.loadingQuote = false;
          this.clickReload = false;
        }
      }
    );
  }

  refreshQuote() {
    this.loadQuote();
  }
}
