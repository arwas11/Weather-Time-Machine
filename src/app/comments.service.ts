import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  commentsUrl = 'http://localhost:3000/comments';

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

  // createComment(CommentInfo: Comment){
  //   // { subject, text } = CommentInfo
  //   this.http.post<Comment>(`${CommentsUrl}`).subscribe()
  // }
}
