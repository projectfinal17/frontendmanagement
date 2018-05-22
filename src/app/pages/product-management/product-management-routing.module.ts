import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DeleteDialogComponent } from '../commons/delete-dialog/delete-dialog.component';
import { ProductCategoriesManagementComponent } from './product-management.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductCategoriesUpdateModalComponent } from './product-categories/product-categories-update.component';
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';

const routes: Routes = [{
  path: '',
  component: ProductCategoriesManagementComponent,
  children: [{
    path: 'productCategories',
    component: ProductCategoriesComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [
    ProductCategoriesUpdateModalComponent,
    DeleteDialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  ProductCategoriesManagementComponent,
  ProductCategoriesComponent
];
