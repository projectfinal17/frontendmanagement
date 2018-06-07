import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DeleteDialogComponent } from '../commons/delete-dialog/delete-dialog.component';
import { ProductManagementComponent } from './product-management.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductComponent} from './product/product.component'
import { ProductCategoriesUpdateModalComponent } from './product-categories/product-categories-update.component';
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';
import { ProductUpdateModalComponent } from './product/product-update.component';
import { ProductPauselModalComponent } from './product/product-pause.component';
import { ProductActivelModalComponent } from './product/product-active.component';



const routes: Routes = [{
  path: '',
  component: ProductManagementComponent,
  children: [
  {
    path: 'productCategories',
    component: ProductCategoriesComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [
    ProductUpdateModalComponent,
    ProductCategoriesUpdateModalComponent,
    ProductPauselModalComponent,
    ProductActivelModalComponent,
    DeleteDialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  ProductManagementComponent,
  ProductCategoriesComponent,
  ProductComponent
];
