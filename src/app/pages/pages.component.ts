import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { CONSTANT } from '../constant';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  menu = [];
  allPages: any = [];

  constructor(
    translate: TranslateService,
    private accessiblePageService: AccessiblePageService,
    private helperService: HelperService
  ) {
    let tranlateWords = {};
    translate.get(['dashboard', 'auth', 'login',
      'demo_management', 'demo', 'accessable_page', 'logout' , 'setting',
      'product_management','product_categories'
    ]).subscribe((res: string) => {
      tranlateWords = res;
    });
    this.menu = [
      {
        title: tranlateWords['dashboard'],
        icon: 'nb-home',
        link: '/pages/dashboard',
        menuhome: true,
        key: 'Dashboard'
      },
      {
        title: tranlateWords['product_management'],
        icon: 'nb-compose',
        // link: '/pages/products',
        children: [
          {
            title: tranlateWords['product_categories'],
            link: '/pages/product-management/productCategories',
            key: 'ProductCategories'
          }
        ]
      },
      {
        title: tranlateWords['setting'],
        icon: 'nb-gear',
        children: [
          {
            title: tranlateWords['accessable_pages'],
            link: '/pages/settings/accessable-pages',
            key: 'AccessablePage'
          },
          {
            title: tranlateWords['user'],
            link: '/pages/settings/users',
            key: 'User'
          },
        ],
      },
      {
        title: tranlateWords['auth'],
        icon: 'nb-locked',
        children: [
          {
            title: tranlateWords['login'],
            link: '/auth/login',
          },
          {
            title: tranlateWords['logout'],
            link: '/auth/logout',
          },
        ],
      },
    ];
  }



  async ngOnInit() {
    await this.getAccessablePages();
    this.removeUnaccessableMenu();

  }

  // remove unaccesable menu and submenu 
  private removeUnaccessableMenu() {
    let role = this.helperService.getLocalStorage(CONSTANT.CURRENT_ROLE);
    let removeMenuIndex = [];
    for (let i = 0; i < this.menu.length; i++) {
      let removeSubMenuIndex = [];
      let subMenu = this.menu[i];
      if (subMenu.hasOwnProperty('children')) {
        let childrens = subMenu.children;
        for (let j = 0; j < childrens.length; j++) {
          let page = this.helperService.findObjectInList('name', childrens[j].key, this.allPages);
          if (page && page.validRoleNames.indexOf(role) < 0) {
            removeSubMenuIndex.push(j);
          }
        }
        for (var j = 0; j < removeSubMenuIndex.length; j++) {
          childrens.splice(removeSubMenuIndex[j], 1);
          for (var k = j + 1; k < removeSubMenuIndex.length; k++) {
            removeSubMenuIndex[k]--;
          }
        }
        if (childrens.length === 0) {
          removeMenuIndex.push(i);
        }
      }
    }

    // remove submenu
    for (var i = 0; i < removeMenuIndex.length; i++) {
      this.menu.splice(removeMenuIndex[i], 1);
      for (var j = i + 1; j < removeMenuIndex.length; j++) {
        removeMenuIndex[j]--;
      }
    }
  }

  private async getAccessablePages() {
    let response = await this.accessiblePageService.getAll();
    this.allPages = response.data;
  }

}
