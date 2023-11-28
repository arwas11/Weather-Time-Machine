import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  user: any;

  constructor(private http: HttpClient) {}

  getUser(username: any) : Observable<User>{
    const userUrl = `${this.usersUrl}/${username}`;
    // getUser() constructs a request URL with the desired user's username
    // The server should respond with a single user rather than an array of users
    // getUser() returns an Observable<user>, which is an observable of user objects rather than an observable of user arrays.
    return this.http
      .get<User>(userUrl)
      .pipe(
        tap((user) => console.log(`fetched user,${user}, with username=${username}`)),
        catchError(this.handleError<User>(`getUser username = ${username}`))
      );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        // this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
