import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter";
import { CustomDatepickerI18n, I18n } from "../../commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n";
import { PostsService } from 'app/@core/data/post.service';

@Component({
    selector: 'post-update-modal-component',
    templateUrl: './post-update.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})

export class PostsUpdateModalComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;

    private today: any = this.helperService.getTodayForDatePicker();

    model: any = {
    };
    isEditMode = false;
    allPosts: any = [];
    isDuplicatedCode = false;
    productCategoryList: any = [];
    selectedDate: any = this.today;
    isKeepOpen: boolean = false;

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private toastrService: ToastrService,
        private postService : PostsService,
        private translateService: TranslateService,
        private i18n: I18n, 
        config: NgbDatepickerConfig,
    ) {
    }

    async ngOnInit() {
        if (this.editedModel) {
            this.isEditMode = true;
            this.model = this.helperService.deepCopy(this.editedModel);
        }
        await this.getAllPosts();
    }

    isDuplicatedForm() {
        return this.isDuplicatedCode;
    }

    async getAllPosts() {
        const response = await this.postService.getAll();
        this.allPosts = response.data;
    }
  
    async onChangeNameValue(id, value) {
        this.isDuplicatedCode = this.helperService.isDuplicatedValue(id, value, 'code', this.allPosts);
    }

    async onClickSaveBtn() {
        try {
            if (this.isEditMode) {
                let response = await this.postService.edit(this.model.id, this.model);
                this.helperService.showEditSuccessToast();
            } else {
                let response = await this.postService.add(this.model);
                this.helperService.showAddSuccessToast();
                if (this.isKeepOpen) {
                    this.getAllPosts();
                    this.model.name = null;
                }
            }
            if (!this.isKeepOpen) {
                this.activeModal.close();
                this.reload();
            }
        } catch (error) {
            this.helperService.showErrorToast(error);
        }
    }
}
