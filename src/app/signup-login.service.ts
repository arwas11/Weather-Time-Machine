import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignupLoginService {
  usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  users: User[] = [];
  user: any;

  constructor(private http: HttpClient) {
    // this.findAll();
  }

  // findAll() {
  //   //Not necessary. used to make sure the data expected matches the type of User[]
  //   this.http.get<User[]>(`${this.usersUrl}`).subscribe((users) => {
  //     this.users = users;
  //   });
  // }

  /** POST: add a new user to the database */
  addUser(user: any): Observable<User> {
    // const { username, email, password} = user
    console.log('from the service');
    return this.http
      .post<User>(`${this.usersUrl}`, user, this.httpOptions)
      .pipe(
        tap((newUser: User) =>
          console.log(`added user w/ username=${newUser.username}`)
        ),
        catchError(this.handleError<User>('addUser'))
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
