import { NgModule } from '@angular/core';
import { <%= classify(name) %>AdDashboardRoutingModule } from './routing/<%= dasherize(name) %>-dashboard-routing.module';
import { <%= classify(name) %>AdMainMenuModule } from './main-menu/<%= dasherize(name) %>-main-menu.module';
import { <%= classify(name) %>AdDashboardApplicationModule } from './application/<%= dasherize(name) %>-ad-dashboard-application.module';
import { <%= classify(name) %>AdDashboardSlotsModule } from './slots/<%= dasherize(name) %>-ad-dashboard-slots.module';
@NgModule({
  declarations: [],
  imports: [
    <%= classify(name) %>AdDashboardApplicationModule,
    <%= classify(name) %>AdDashboardRoutingModule,
    <%= classify(name) %>AdDashboardApplicationModule,
    <%= classify(name) %>AdMainMenuModule,
    <%= classify(name) %>AdDashboardSlotsModule
  ]
})
export class <%= classify(name) %>ForAdDashboardModule { }
