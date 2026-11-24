import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagDetail } from './tag-detail/tag-detail';

const routes: Routes = [
  {
    path:':tag', component: TagDetail
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
