import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Leaderboard } from 'src/app/models/Leaderboard/leaderboard';
import { PageOfItems } from 'src/app/models/PageOfItems/page-of-items';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) { }

  baseURL: string = environment.leaderboardURL;
  pageSize: number = 10;


  userStatsHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getLeaderboard(pageNumber: number): Observable<PageOfItems<Leaderboard>> {
    return this.http.get<PageOfItems<Leaderboard>>(this.baseURL + "?pageNumber=" + pageNumber + "&pageSize=" + this.pageSize);
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
