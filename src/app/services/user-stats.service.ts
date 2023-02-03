import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStats } from '../models/user-stats.model';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {

  baseURL: string = environment.userStatsURL;
  private userStats?: UserStats;

  userStatsHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };



  constructor(private http: HttpClient) { }

  getUserStats(username: string | null): Observable<UserStats> {
    return this.http.get<UserStats>(this.baseURL + "/" + username).pipe(
      map(res => {
        this.userStats = res;
        return this.userStats;
      }), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
