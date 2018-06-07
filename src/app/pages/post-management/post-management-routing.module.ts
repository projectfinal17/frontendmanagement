import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DeleteDialogComponent } from '../commons/delete-dialog/delete-dialog.component';
import { PostManagementComponent } from './post-management.component';
import { PostsComponent } from './post/post.component';
import { PostsUpdateModalComponent } from './post/post-update.component';
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';

const routes: Routes = [{
  path: '',
  component: PostManagementComponent,
  children: [{
    path: 'posts',
    component: PostsComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [
    PostsUpdateModalComponent,
    DeleteDialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  PostManagementComponent,
  PostsComponent
];
