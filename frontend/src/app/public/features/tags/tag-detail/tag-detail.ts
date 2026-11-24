import { Component, inject } from '@angular/core';
import { PostsList } from '../../posts/posts-list/posts-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [PostsList],
  selector: 'app-tag-detail',
  styleUrl: './tag-detail.css',
  templateUrl: './tag-detail.html',
})
export class TagDetail {

  route = inject(ActivatedRoute);
  tag = ''

  constructor(){
    this.route.params.subscribe(params=>{
      this.tag = params['tag'];
    });
  }
}
