import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import {BaseService} from './base.service';
@Injectable()
export class ProductService extends BaseService {

  constructor( public childHttp: Http, public childHelperService: HelperService) {
    super(childHttp, childHelperService, 'products');  
  }

  async changeActiveStatus(id: string, isActive: boolean ): Promise<any> {
    try {
      let headers = this.childHelperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let body = {};
      const response = await this.childHttp.put(`${this.domain}/isActive/${id}/${isActive}`, body ,  options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.childHelperService.handleError(error);
    }
  }


}
