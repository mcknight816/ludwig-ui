import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {IconService} from "../../../services/icon.service";
import {ThemeService} from "../../../services/theme.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
    isDarkMode:boolean = false;
    title = 'ludwig ui';

    constructor(private authService:AuthService,private iconService:IconService,private themeService:ThemeService) {
        this.iconService.registerIcons();
    }

    ngOnInit(): void {
      this.isDarkMode = this.themeService.isDarkMode();
    }

    toggleDarkMode() {
      this.isDarkMode = this.themeService.toggleTheme();
    }

    isLoggedIn() {
        return this.authService.hasValidToken();
    }

    login($event: MouseEvent){
        this.authService.signIn();
    }

  toggleSideNav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
