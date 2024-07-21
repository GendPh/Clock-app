import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Quote {
  quote: string;
  author: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  public loadQuote(): Observable<Quote[]> {
    const headers = new HttpHeaders({
      'X-Api-Key': 'mqLDacqlgCgRgW/jcKMXDQ==XL7onUexr5kx07b7'
    });

    return this.http.get<Quote[]>('https://api.api-ninjas.com/v1/quotes?category=education', { headers });
  }
}
