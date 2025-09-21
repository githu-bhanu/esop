import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'esop-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuOpen: boolean = false;
  @Input() menuItems: any = [];
  public activeName: any = null;
  public isMouseOverTemplate = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['menuOpen']) {
      this.activeName = null;
    }
  }

  routeTo(route: any) {
    try {
      if (!route) {
        return;
      }
      this.router.navigate([route]);
    } catch (routeErr) {
      console.error(routeErr);
    }
  }

  clickedMenu(name) {
    try {
      if (this.menuOpen) {
        return;
      }
      this.activeName = this.activeName === name ? null : name;
    } catch (nameErr) {
      console.error(nameErr);
    }
  }

  hoveredOnElement(e,ind, name) {
    try {
      if (!this.menuOpen) {
        return;
      }
      this.activeName = this.activeName === name ? null : name;
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

}
