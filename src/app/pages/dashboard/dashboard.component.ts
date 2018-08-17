import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { OrderService } from '../../@core/data/order.service';
import { ThemeSettingsComponent } from '../../@theme/components';

@Component({
  selector: 'my-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperService: HelperService,
    private accessiblePagesSerivce: AccessiblePageService,
    private orderService : OrderService,
  ) {
  }
  selectedDate: any;
  model: any = {
  };

  async ngOnInit() {
    this.selectedDate = this.helperService.getTodayForDatePicker();
    // console.log(this.selectedDate);
    await this.getIncome();
    // console.log()
  }
  async getIncome() {
    let date = this.helperService.convertNgDatePickerToJSONFormat(this.selectedDate);
    this.model = await this.orderService.GetIncome(date);
  }

  onClickInCome(){
    
  }
}
