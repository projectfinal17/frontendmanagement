import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import {BaseService} from './base.service';
@Injectable()
export class PostsService extends BaseService {

  constructor( public childHttp: Http, public childHelperService: HelperService) {
    super(childHttp, childHelperService, 'Posts');  
  }

}
