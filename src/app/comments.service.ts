import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  commentsUrl = 'http://localhost:3000/comments';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  comments: Comment[] = [];
  // comment: Comment;

  constructor(private http: HttpClient) {
    this.getComments();
  }

  getComments() {
    //Not necessary. used to make sure the data expected matches the type of Comment[]
    this.http.get<Comment[]>(`${this.commentsUrl}`).subscribe((comments) => {
      console.log('these are comments', comments);
      if (comments) {
        this.comments = comments;
      }
    });
  }
  /** POST: add a new comment to the database */
  addComment(comment: any): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, this.httpOptions).pipe(
      tap((newComment: Comment) => console.log(`added comment w/ id=${newComment.id}`)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  // updateHero(hero: Comment): Observable<any> {
  //   /**
  //    * The HttpClient.put() method takes three parameters:
  //    * The URL
  //    * The data to update, which is the modified hero in this case
  //    * Options
  //    */
  //   // The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService.
  //   return this.http.put(this.commentsUrl, hero, this.httpOptions).pipe(
  //     tap((_) => console.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  // /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<Comment> {
  //   // The URL is the heroes resource URL plus the id of the hero to delete
  //   const url = `${this.commentsUrl}/${id}`;
  //   //don't send data as you did with put() and post()
  //   // You still send the httpOptions
  //   return this.http.delete<Comment>(url, this.httpOptions).pipe(
  //     tap((_) => console.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Comment>('deleteHero'))
  //   );
  // }

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
