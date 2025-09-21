// tslint:disable:component-selector ter-indent ter-arrow-parens align max-line-length no-this-assignment prefer-template no-increment-decrement no-inferrable-types

import { Component, OnInit, HostListener, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { StorageListenerService } from 'src/app/services/storage-listener.service';
import { AuthService } from 'src/app/guards/auth.service';
import { Config } from 'src/app/config/config';

@Component({
  selector: 'esop-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss'],
})
export class LeftSideBarComponent implements OnInit, OnDestroy {
  @Input() menuOpen: any = true;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public menusList: any = [];
  public sidebarOpened = true;
  public selectedItem: any;
  public sideBarSubscription: Subscription;
  themeDetails: any;
  public selectedtheme;
  public previousClass;
  public parentSelection:string='';
  public isMouseOverTemplate = false;
  public sideOptions: any = {
    retry: false,
  };
  public mediaBreakPoint: any;
  public appLanguage: string = 'en';
  constructor(public appService: AppService, public router: Router, public _auth: AuthService, public _session: StorageListenerService) { }
  public projectDetails = {};
  public userDetails = {};
  lastTheme:any = '';
  public mediaResolutionSubscription: Subscription;
  ngOnInit() {
    document.body.classList.add('coll-left-sidebar');
    // this.projectDetails = this._auth.getProjectDetails();
    // this.userDetails = this._auth.getUserDetails();
    this.sideBarSubscription = this._auth.refreshSideBarItems.asObservable().subscribe((res) => {
      if (res) {
        // this.projectDetails = this._auth.getProjectDetails();
        this.getMenusList();
      }
    });
    this.mediaBreakPoint = localStorage.getItem('mediaBreakPoint');
    if (['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1) {
      this.sidebarOpened = false;
      this.toggleSidebar();
    }
    this.mediaResolutionSubscription = this._session.watchStorage().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.mediaBreakPoint = data;
    });
    this.getMenusList();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.updateBodyClass();
      }
    });
    setTimeout(() => {
      this.updateBodyClass();
    }, 100);
    // this.setTheme();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['menuOpen']) {
      this.toggleSidebar();
    }
  }

  hoveredOnElement(e,ind) {
    try {
      if (!this.isMouseOverTemplate) {
        const element = document.getElementById('sub-menu-data' + ind);
        if (element) {
          const rect = element.getBoundingClientRect();
          const mouseY = e.clientY;
          if ((mouseY + rect['height'] ) > window.innerHeight) {
            if((window.innerHeight - mouseY)<20){
              const topPos = mouseY - rect['height'] - 20;
              element.style['top'] = `${topPos}px`;
            }else{
              const topPos = mouseY - rect['height'];
              element.style['top'] = `${topPos}px`;
            }
              
          } else {
            let temp = mouseY - rect['height'];
            if (rect['height'] > 60) {
              temp = mouseY - 80;
            } else {
              temp = mouseY;
            }
            element.style['top'] = `${temp}px`;
          }
        }
    }
    } catch (error) {
      console.error(error);
    }
  }

  setMouseOverTemplate(value: boolean): void {
    this.isMouseOverTemplate = value;
  }

  onSelectedTheme(theme?) {
    if (theme) {
      this.selectedtheme = theme;
    }
    let localStorageTheme = this.getItemFromLocalStorage('themeDetails');
    if (localStorageTheme) {
      localStorage.removeItem('themeDetails');
      document.body.classList.remove(localStorageTheme);
    }
    localStorage.setItem('themeDetails', this.selectedtheme);
    document.body.classList.add(theme);

    this.changeColor();
    this.changeSubSidebarColor();
    this.changeFontColor();
    // this.headerService.themeEventSubject.next(this.userDetails['selectedtheme']);
  }

  
  setTheme() {
    const projectDet: any = this._auth.getProjectDetails();
    const localTheme: any = projectDet?.theme?.theme;
    this.selectedtheme = localTheme ? localTheme : Config.CONSTANTS.defaultTheme.theme;
    this.onSelectedTheme(this.selectedtheme);
  }
  
  themeSelection = Config.HEADERCOMPCONSTANTS.SUBMENUTHEMES
  changeSubSidebarColor() {
    let configSideBarStyle = document.getElementsByClassName("left-side-bar");
    if (configSideBarStyle && configSideBarStyle.length) {
      if (configSideBarStyle[0] && configSideBarStyle[0]['style'] && this.themeSelection[this.selectedtheme]) {
        configSideBarStyle[0]['style']['backgroundColor'] = this.themeSelection?.[this.selectedtheme]?.["bgColor"];
      }
    }
  }
  themeSelected = Config.HEADERCOMPCONSTANTS.THEMES;
  changeColor() {
    let headerStyle = document.getElementsByClassName("left-side-bar");
    if (headerStyle && headerStyle.length) {
      if (headerStyle[0] && headerStyle[0]['style'] && this.themeSelection[this.selectedtheme]) {
        headerStyle[0]['style']['backgroundColor'] = this.themeSelected?.[this.selectedtheme]?.["bgColor"];
      }
    }
  }
  changeFontColor() {

    if (this.previousClass) {
      this.removePreviousClass(this.previousClass);
    }
    let subName = Config.HEADERCOMPCONSTANTS.SUBCLASSNAMES;
    for (let ind = 0; ind < subName.length; ind++) {
      let subClassName = document.getElementsByClassName(subName[ind]);
      if (subClassName && subClassName.length) {
        for (let index = 0; index < subClassName.length; index++) {
          subClassName[index].classList.add(`${this.selectedtheme}-header`);
        }
        this.previousClass = `${this.selectedtheme}-header`;
      }
    }
  }
  removePreviousClass(className) {
    let subName = Config.HEADERCOMPCONSTANTS.SUBCLASSNAMES;
    for (let ind = 0; ind < subName.length; ind++) {
      var removeCLassDivElement: any = document.getElementsByClassName(subName[ind]);
      removeCLassDivElement.forEach(element => {
        element.classList.remove(className);
      });
    }
  }
  getItemFromLocalStorage(item) {
    try {
      const storeObj = localStorage.getItem(item);
      if (storeObj) {
        return storeObj;
      }
      return false;
    } catch (errorStorage) {
      return false
      console.error(errorStorage)
    }
  }

  updateBodyClass() {
    const classList = document.body.classList;
    if (classList.contains('app-window') || classList.contains('embedded-as-iframe') || window.location.href.includes('/apps-view/')) {
      classList.remove('coll-left-sidebar');
      classList.remove('exp-left-sidebar');
    } else if (!classList.contains('exp-left-sidebar') && !classList.contains('coll-left-sidebar')) {
      classList.add('coll-left-sidebar');
      this.sidebarOpened = false;
    } else if (classList.contains('coll-left-sidebar')) {
      this.sidebarOpened = false;
    } else if (classList.contains('exp-left-sidebar')) {
      this.sidebarOpened = true;
    }
  }

  getMenusList() {
    try {
      if (this.router.url.includes('p/login')) {
        return;
      }
      // this.appLanguage = localStorage.getItem('lang') || 'en';
      // this.userDetails = this._auth.getUserDetails();
      const payload = {
        // language: localStorage.getItem('lang') || 'en',
        // user_id: this.userDetails['user_id'] || '',
        // user_role_id: this.userDetails['user_role_id'] || '',
      };
      // const type = 'mmachine';
      // payload['type'] = type;
      // payload['customer_project_id'] = this.projectDetails['project_id'];
      this.appService.getSidebarMenusList(payload).subscribe((resp: any) => {
        if (resp && resp['status'] === 'success') {
          this.menusList = resp['data'];
          this.sideOptions['retry'] = false;
        } else {
          this.sideOptions['retry'] = true;
        }
      }, (error) => {
        console.error(error);
        // this.getMenusAfterTimeout();
        this.sideOptions['retry'] = true;
      });
    } catch (Err) {
      this.sideOptions['retry'] = true;
      this.getMenusAfterTimeout();
      console.error(Err);
    }
  }

  getMenusAfterTimeout = () => {
    try {
      setTimeout(() => {
        this.getMenusList();
      }, 2000);
    } catch (menusError) {
      console.log(menusError);
    }
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.body.classList.remove('coll-left-sidebar');
      document.body.classList.add('exp-left-sidebar');
    } else {
      document.body.classList.remove('exp-left-sidebar');
      document.body.classList.add('coll-left-sidebar');
    }
    // this.visualizeService?.changeDetectSub.next(null);
  }

  getParentItem=(eachItem, menuList, parentItem)=>{
    menuList.forEach(item=>{
      if(item.key === eachItem.key){
        this.parentSelection = parentItem  
      }
      else if(item.children?.length){
        this.getParentItem(eachItem,item.children, item.key)
      }
    })
  }

  onItemClick(eachItem, menusList = []) {
    const sideMenu = document.getElementsByClassName('left-side-bar');
    if (eachItem.route) {
      this.selectedItem = eachItem;
      this.getParentItem(eachItem,this.menusList, eachItem.key)
      this.router.navigate([eachItem.route]);
      // this.router.navigate([eachItem.route], eachItem.queryParams ? { queryParams: eachItem.queryParams } : undefined);
      this.collapseMenuItems(menusList);
      if (window.innerWidth > 992) {
        sideMenu[0].setAttribute('style', 'display:block;');
      } else {
        sideMenu[0].setAttribute('style', 'display:none;');
      }
      return;
    }
    if (eachItem.children && this.sidebarOpened) {
      for (const iterator of menusList) {
        if (iterator.key !== eachItem.key) {
          iterator['expanded'] = false;
        }
      }
      this.collapseMenuItems(eachItem.children);
      eachItem['expanded'] = !eachItem['expanded'];
    }
  }

  collapseMenuItems(item) {
    if (item) {
      for (const iterator of item) {
        if (iterator.children) {
          this.collapseMenuItems(iterator.children);
        }
        iterator['expanded'] = false;
      }
    }
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    if (!document.body.classList.contains('embedded-as-iframe') && !document.body.classList.contains('app-window') && !(window.location.href.includes('apps-view') && window.location.href.includes('project_'))) {
      const sideMenu = document.getElementsByClassName('left-side-bar');
      if (window.innerWidth > 992) {
        this.sidebarOpened = false;
        this.toggleSidebar();
        if (sideMenu) {
          sideMenu[0].setAttribute('style', 'display: block !important');
        }
      }
    }
  }
  ngOnDestroy() {
    if (this.sideBarSubscription) {
      this.sideBarSubscription.unsubscribe();
    }
    if (this.mediaResolutionSubscription) {
      this.mediaResolutionSubscription.unsubscribe();
    }
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
