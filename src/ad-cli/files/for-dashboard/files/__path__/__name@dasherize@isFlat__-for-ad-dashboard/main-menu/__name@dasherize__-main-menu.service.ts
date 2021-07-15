import { IAdMenuListService } from '@ad/toolkit/menu-list/IAdMenuListService';
import { Injectable } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { MainMenu } from 'projects/ad-dashboard/src/app/dashboard/dashboard-sidenav/dashboard-sidenav.MainMenu.model';
import { AdMenuListBuilderService } from '@ad/toolkit/menu-list/menu-list-builder';
@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>AdMainMenuService extends AdMenuListBuilderService<MainMenu> implements IAdMenuListService<MainMenu> {
  constructor(
  ) {
    super();
  }
  buildMenu() {
    const rawMenuList = [
      {
        name: '<%= classify(name) %>',
        route: './<%= name %>',
        icon: faInfoCircle,
      },
    ];
    this.addMenu(this.mapMenuListToClass(rawMenuList, MainMenu));
  }
}
