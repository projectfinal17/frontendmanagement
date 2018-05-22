import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoService } from './demo.service';
import { AuthService } from './auth.service';
import { UserService } from 'app/@core/data/user.service';
import { RoleService } from 'app/@core/data/role.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { StateService } from 'app/@core/data/state.service';
const SERVICES = [
  AuthService,
  DemoService,
  UserService,
  RoleService,
  AccessiblePageService,
  StateService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
