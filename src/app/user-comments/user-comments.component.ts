import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Comment } from '../comment';
import { CommentsService } from '../comments.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.css',
})
export class UserCommentsComponent implements OnInit {
  comments: Comment[] = [];
  comment: Comment[] = [];

  text = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
  ]);;

  constructor(private userCommentsService: CommentsService) {}

  ngOnInit(): void {
    this.userCommentsService.getComments();
    this.comments = this.userCommentsService.comments;
  }

  //need a logged in user
  addComment() {
    let comment = this.text.value;
    console.log('testing comment', comment);

    if (!comment) {
      return;
    }
    console.log(comment);
    this.userCommentsService.addComment(comment)
    .subscribe((comment) => {
      console.log('new comment submit', comment);
      this.comment[0] = comment;
    });
    this.text.setValue('');
  }
}
