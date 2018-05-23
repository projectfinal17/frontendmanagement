import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';

@Component({
  selector: 'my-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperService: HelperService,
    private accessiblePagesSerivce: AccessiblePageService
  ) {
  }
  
  async ngOnInit() {
  }
}
