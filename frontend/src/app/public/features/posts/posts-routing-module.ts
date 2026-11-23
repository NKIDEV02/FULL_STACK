import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsList } from './posts-list/posts-list';
import { PostDetail } from './post-detail/post-detail';

const routes: Routes = [
  {path: '', component: PostsList},
  {path: 'post/:id', component: PostDetail},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
