import { Component, Input, OnInit } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'app/@core/data/product.service';
import { HelperService } from 'app/@core/utils/helper.service';

@Component({
    selector: 'product-pause-modal-component',
    templateUrl: './product-pause.component.html',
    providers: [
    ]
})
export class ProductPauselModalComponent implements OnInit {
    @Input() editedModel: any;

    model: any = {      
    };
   
    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private productService: ProductService
    ){}

    async ngOnInit() {
        this.model = this.helperService.deepCopy(this.editedModel);
    }
    async onClickPauseBtn(){
        try{
            await this.productService.changeActiveStatus(this.model.id, false);
            this.helperService.showSuccessToast('success', 'pause_product_successfully');
            this.activeModal.close();
        }catch(error) {
            this.helperService.showErrorToast(error);
        }
      
    }
   

}
