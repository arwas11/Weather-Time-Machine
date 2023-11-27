import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Comment } from '../comment';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.css'
})
export class UserCommentsComponent implements OnInit {

  comments: Comment[] = []

  constructor(private userCommentsService: CommentsService) {
}
ngOnInit(): void {
  this. userCommentsService.getComments()
  this.comments = this.userCommentsService.comments
}

}
