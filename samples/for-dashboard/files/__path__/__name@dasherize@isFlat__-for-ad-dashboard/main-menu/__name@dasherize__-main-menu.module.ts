import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= classify(name) %>AdMainMenuService } from './<%= dasherize(name) %>-main-menu.service';
import { AdDashboardMainMenuModule } from 'projects/ad-dashboard/src/app/shared/dashboard-main-menu/dashboard-main-menu.module';
import { AdDashboardMainMenuService } from 'projects/ad-dashboard/src/app/shared/dashboard-main-menu/dashboard-main-menu.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdDashboardMainMenuModule
  ],
  providers:[
    <%= classify(name) %>AdMainMenuService
  ]
})
export class <%= classify(name) %>AdMainMenuModule { 
  constructor(
    private mainMenuService: <%= classify(name) %>AdMainMenuService,
    private adDashboardMainMenuService: AdDashboardMainMenuService
    ){
      this.adDashboardMainMenuService.addMenu(this.mainMenuService.menuList);
  }
}
