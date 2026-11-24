import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetail } from './category-detail/category-detail';

const routes: Routes = [
  {
    path: ':category', component: CategoryDetail
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
