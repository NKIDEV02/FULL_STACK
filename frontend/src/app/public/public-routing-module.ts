import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Public } from './public';

const routes: Routes = [
  {path: '', component: Public, 
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
export class PublicRoutingModule {}
