import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Zone } from '../model/zone.model';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private zoneUrl = 'https://api.ipbase.com/v2/info';

  constructor(private http: HttpClient) { }

  getZone(): Observable<Zone> {
    const header: HttpHeaders = new HttpHeaders({
      'apikey': 'ipb_live_Co2fOFMZHqwqyIDNxefHIVZHwd0flnPV3xRTLHRM'
    });

    return this.http.get<Zone>(this.zoneUrl, { headers: header }).pipe(
      map((response: Zone) => {

        console.log(response.data.timezone.id);

        

        return response;
      })
    );
  }
}
