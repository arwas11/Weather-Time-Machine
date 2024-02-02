import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AddCommentsService {

  commentsUrl = 'http://localhost:3000/comments'
  comments: Comment[] = []
  // comment: Comment;

  constructor(private http: HttpClient){
    this.findAll();
  }  

  findAll(){
    //Not necessary. used to make sure the data expected matches the type of Comment[]
    this.http.get<Comment[]>(`${this.commentsUrl}`).subscribe(Comments => {
    this.comments = Comments;
    })
  }

  // createComment(CommentInfo: Comment){
  //   // { Commentname, email, password} = CommentInfo
  //   this.http.post<Comment>(`${CommentsUrl}`).subscribe()
  // }
}
