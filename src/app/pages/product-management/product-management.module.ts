import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonsModule} from '../commons/commons.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PipeModule } from '../../pipes/pipe.module';
import { ProductCategoriesUpdateModalComponent } from 'app/pages/product-management/product-categories/product-categories-update.component';
import { ProductUpdateModalComponent } from 'app/pages/product-management/product/product-update.component';
import { TablesRoutingModule,routedComponents } from './product-management-routing.module';
import { ProductPauselModalComponent } from './product/product-pause.component';
import { ProductActivelModalComponent } from './product/product-active.component';

const notRoutedComponents = [ 
  ProductCategoriesUpdateModalComponent,
  ProductUpdateModalComponent,
  ProductPauselModalComponent,
  ProductActivelModalComponent,
  
]

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    TranslateModule,
    CommonsModule,
    CurrencyMaskModule,
    PipeModule
    
  ],
  declarations: [
    ...routedComponents,
    ...notRoutedComponents
  ],
  providers: [
  ],
})
export class ProductManagementModule { }
