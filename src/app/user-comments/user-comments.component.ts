import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Comment } from '../comment';
import { CommentsService } from '../comments.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.css'
})
export class UserCommentsComponent implements OnInit {

  comments: Comment[] = []
  comment: Comment[] = [];

  text = new FormControl('', [Validators.required])

  
  constructor(private userCommentsService: CommentsService) {
}
ngOnInit(): void {
  this. userCommentsService.getComments()
  this.comments = this.userCommentsService.comments
}

//need a logged in user
addComment() {
  let comment = this.text.value
  if (!comment) { return; }
  console.log(comment);
  this.userCommentsService.addComment(comment).subscribe(comment => {
    console.log('new comment submit', comment);
    this.comment[0] = comment
  })
}

}
