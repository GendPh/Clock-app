import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Zone } from '../model/zone.model';

export interface time {
  hour: string;
  minute: string;
}

export interface Details {
  entryMessage: string;
  currentTimezone: string;
  dayOfYear: number;
  dayOfWeek: number;
  weekNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private zoneUrl = 'https://api.ipbase.com/v2/info';

  private showMore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showMore$: Observable<boolean> = this.showMore.asObservable();

  private time: BehaviorSubject<time> = new BehaviorSubject<time>({ hour: "00", minute: "00" });
  public time$: Observable<time> = this.time.asObservable();

  private currentZone: BehaviorSubject<string> = new BehaviorSubject<string>('Lisbon, Pt');
  public currentZone$: Observable<string> = this.currentZone.asObservable();

  private details: BehaviorSubject<Details> = new BehaviorSubject<Details>({
    entryMessage: 'Good Morning',
    currentTimezone: 'Europe/Lisbon',
    dayOfYear: 0,
    dayOfWeek: 0,
    weekNumber: 0
  });
  public details$: Observable<Details> = this.details.asObservable();

  constructor(private http: HttpClient) {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    this.details.next({ ...this.details.value, entryMessage: this.setMessages(String(hour)) });

    if (minute < 10 && minute >= 0) {
      this.time.next({ hour: String(hour), minute: String(`0${minute}`) });
    } else {
      this.time.next({ hour: String(hour), minute: String(minute) });
    }


  }

  public getZone(): Observable<Zone> {
    const header: HttpHeaders = new HttpHeaders({
      'apikey': 'ipb_live_Win54mAJdNkXnBdM5zW4a2ES28FJOrLY6BTjKRYW'
    });
  
    return this.http.get<Zone>(this.zoneUrl, { headers: header }).pipe(
      map((response: Zone) => {
        const time: time = this.extractHourAndMinute(String(response.data.timezone.current_time));
        this.time.next(time);
        this.currentZone.next(`${response.data.location.city.name}, ${response.data.location.country.alpha2}`);
        let details: Details = {} as Details;
  
        details.entryMessage = this.setMessages(time.hour);
  
        // Update the URL to HTTPS
        this.http.get('https://worldtimeapi.org/api/timezone/Europe/Lisbon').subscribe(
          (response: any) => {
            details.currentTimezone = response.timezone;
            details.dayOfYear = response.day_of_year;
            details.dayOfWeek = response.day_of_week + 1;
            details.weekNumber = response.week_number;
  
            this.details.next(details);
          }
        )
  
        return response;
      })
    );
  }
  

  private extractHourAndMinute(timestamp: string): time {
    const date = new Date(timestamp);
    const hour = String(date.getHours()); // Local time hour
    const minute = date.getMinutes(); // Local time minute

    if (minute < 10 && minute >= 0) {
      return { hour, minute: String(`0${minute}`) };
    }

    return { hour, minute: String(minute) };
  }

  private setMessages(hour: string): string {
    if (hour >= '05' && hour < '12') {
      return 'Good Morning';
    } else if (hour >= '12' && hour < '18') {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  public toggleShowMore() {
    this.showMore.next(!this.showMore.value);
  }
}
