import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStats } from '../models/user-stats.model';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {

  baseURL: string = environment.userStatsURL;

  userStatsHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };



  constructor(private http: HttpClient) { }

  getUserStats(username: string | null) : Observable<UserStats>{
    return this.http.get<UserStats>(this.baseURL+"/"+username);
  }

}
