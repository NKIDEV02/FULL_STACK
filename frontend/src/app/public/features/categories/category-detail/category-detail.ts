import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsList } from '../../posts/posts-list/posts-list';

@Component({
  imports: [
    PostsList
  ],
  selector: 'app-category-detail',
  styleUrl: './category-detail.css',
  templateUrl: './category-detail.html',
})
export class CategoryDetail {
   route = inject(ActivatedRoute);
  category = ''

  constructor(){
    this.route.params.subscribe(params=>{
      this.category = params['category'];
    });
  }
}
