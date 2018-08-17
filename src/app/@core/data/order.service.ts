import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import {BaseService} from './base.service';
@Injectable()
export class OrderService extends BaseService {

  constructor( public childHttp: Http, public childHelperService: HelperService) {
    super(childHttp, childHelperService, 'Orders');  
  }

  async GetIncome(date : string ): Promise<any> {
    try {
      let headers = this.childHelperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      
      const response = await this.childHttp.get(`${this.domain}/` + date,  options)
        .toPromise();
        console.log(response);
      return response.json();
    } catch (error) {
      this.childHelperService.handleError(error);
    }
  }
}
