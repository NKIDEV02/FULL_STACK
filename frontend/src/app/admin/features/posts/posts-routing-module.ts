import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsList } from '../../../public/features/posts/posts-list/posts-list';
import { PostEditor } from './post-editor/post-editor';

const routes: Routes = [
  {path: '', component: PostsList},
  {path: 'post/:id', component: PostEditor},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
