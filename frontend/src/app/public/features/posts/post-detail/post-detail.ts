import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetail {}
