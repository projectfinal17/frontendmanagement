import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductUpdateModalComponent } from './product-update.component';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'app/@core/data/product.service';
import { CONSTANT } from 'app/constant';
import { ProductActivelModalComponent } from './product-active.component';
import { ProductPauselModalComponent } from './product-pause.component';

@Component({
  selector: 'my-product',
  templateUrl: './product.component.html',
  styles: [`
  `],
})
export class ProductComponent implements OnInit {

  dataList = [];
  page: number = 1;
  sort: string = 'name asc';
  totalSize: number = 0;
  keyword: string = '';

  showedColumnList = [
    { name: 'code', translateKey: 'code', isShowed: true, sortable: false },
    { name: 'name', translateKey: 'name', isShowed: true, sortable: true },
    { name: 'productCategoryName', translateKey: 'product_categories', isShowed: true, sortable: true },
    { name: 'salePrice', translateKey: 'salePrice', isShowed: true, sortable: true },
    { name: 'createdDate', translateKey: 'createdDate', isShowed: true, sortable: true },
    { name: 'imageUrlList', translateKey: 'imageUrl', isShowed: false, sortable: false },
    { name: 'description', translateKey: 'description', isShowed: true, sortable: false },
    { name: 'isActive', translateKey: 'isActive', isShowed: true, sortable: false },
    
  ];

  constructor(
    private productService: ProductService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private translateService: TranslateService,
  ) {

  }
  async ngOnInit() {
    await this.getList();
  }
  async getList() {
    try {
      let response = await this.productService.getList(this.page - 1, CONSTANT.PAGE_SIZE, this.keyword, this.sort);
      this.dataList = response.data;
      this.totalSize = response.totalSize;
    } catch (error) {

    }
  }
  detectSortClassName(fieldName: string): string {
    return this.helperService.detectSortClassName(this.sort, fieldName);
  }

  onPageChange(event): void {
    this.page = event;
    this.getList();
  }
  onChangeSortedField(fieldName: string): void {
    this.sort = this.helperService.handleSortedFieldNameChanged(this.sort, fieldName);
    this.getList();
  }
  onClickSearchBtn(): void {
    this.getList();
  }
  onClickAddBtn(): void {
    const modalRef = this.modalService.open(ProductUpdateModalComponent, { backdrop: 'static' });
    modalRef.result.then(closeData => {
      this.getList();
    }).catch(dismissData => {
    })
  }
  onClickEditBtn(model: any): void {
    const modalRef = this.modalService.open(ProductUpdateModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.editedModel = model;
    modalRef.result.then(closeData => {
      this.getList();
    }).catch(dismissData => {
    })
  }
  onClickDeleteBtn(model: any): void {
    const modalRef = this.modalService.open(DeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();
    };
    this.translateService.get("delete_product").subscribe((res: string) => {
      modalRef.componentInstance.title = res;
    });
    modalRef.componentInstance.deleteFunction = () => {
      return this.productService.delete(model.id);
    }
  }

  onClickPauseBtn(item: any) {
    console.log(item);
    const modalRef = this.modalService.open(ProductPauselModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.editedModel = item;
    modalRef.result.then( closeData=>{ this.getList() } ).catch( dissmissData=>{})
  }
  onClickActiveBtn(item: any){
    console.log(item);
    const modalRef = this.modalService.open( ProductActivelModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.editedModel = item;
    modalRef.result.then( closeData=>{ this.getList() } ).catch( dissmissData=>{})
  }

  formatDate(jsonDate: string): string {
    return this.helperService.convertJSONDatetoDayMonthYear(jsonDate);
  }
}
