import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermissionDenyComponent } from './permission-deny/permission-deny.component';
import { DemoComponent } from 'app/pages/demo-management/demo/demo.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'permission-deny',
    component: PermissionDenyComponent,
  },
  {
    path: 'demo-management',
    loadChildren: './demo-management/demo-management.module#DemoManagementModule'
  },
  {
    path: 'product-management',
    loadChildren: './product-management/product-management.module#ProductManagementModule'
  },
  {
    path: 'post-management',
    loadChildren: './post-management/post-management.module#PostManagementModule'
  },
  {
    path: 'sales',
    loadChildren: './sales-management/sales-management.module#SalesManagementModule',
  },
  {
    path: 'customer-management',
    loadChildren: './customer-management/customer-management.module#CustomerManagementModule'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
