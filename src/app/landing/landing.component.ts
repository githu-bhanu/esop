import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'esop-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  menuOpen: any = true;
  public menuItems: any = [
    { 
      "name": "Home", 
      "title": "Dashboard",
      "icon": "fa fa-home",
      "link": "/app/dashboard" 
    },
    { 
      "name": "Device Management", 
      "icon": "fa fa-cogs", 
      "badge": "New",
      "subItems": [
        { "name": "Devices", "link": "/app/devices" },
        { "name": "Device Groups", "link": "javascript:void(0)" },
        { "name": "Tags", "link": "javascript:void(0)" },
        { "name": "Parameters", "link": "javascript:void(0)" }
      ]
    },
    { 
      "name": "User Management", 
      "icon": "fa fa-users", 
      "badge": "New",
      "subItems": [
        { "name": "Users", "link": "javascript:void(0)"},
        { "name": "User Roles", "link": "javascript:void(0)"},
      ]
    },
    { 
      "name": "Logs", 
      "icon": "fa fa-history", 
      "link": "javascript:void(0)" 
    }
  ];

  constructor() { }
  
  ngOnInit(): void {
    // this.toggleSidebar();
  }
  
  toggleSidebar() {
    this.menuOpen = !this.menuOpen;
    // if (!this.menuOpen) {
    //   document.body.classList.remove('sidebar-closed');
    //   document.body.classList.add('sidebar-opened');
    // } else {
    //   document.body.classList.remove('sidebar-opened');
    //   document.body.classList.add('sidebar-closed');
    // }
    // this.updatePage();
  }

  updatePage() {
    try {
      const sidebar = document.querySelector('.app-aside');
      const root = document.documentElement;
  
      sidebar.classList.toggle('open');
      if (sidebar.classList.contains('open')) {
          root.style.setProperty('--sidebarWidth', '15rem');
      } else {
          root.style.setProperty('--sidebarWidth', '4rem');
      }
    } catch(pageErr) {
      console.error(pageErr);
    }
  }

}
