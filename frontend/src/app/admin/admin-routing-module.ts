import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';

const routes: Routes = [
   {path: '', component: Admin, 
      children: [
      {
        path: '', loadChildren:()=> import('./features/posts/posts-module').then(m => m.PostsModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
