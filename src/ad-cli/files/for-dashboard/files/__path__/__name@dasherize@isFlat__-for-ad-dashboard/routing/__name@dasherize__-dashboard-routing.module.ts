import { AdRouteBuilderService } from 'projects/ad-dashboard/src/app/shared/ad-route-builder/ad-route-builder.service';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from 'projects/ad-dashboard-applications/ad-home/src/app/home/home.component';

export const routes: Routes = [
  {
    path: '<% name %>', component: HomeComponent
  },
 
];

@NgModule({
})
export class <%= classify(name) %>AdDashboardRoutingModule {
  constructor(adRouteBuilderService: AdRouteBuilderService) {
    adRouteBuilderService.addChildRoutes(routes);
  }
}
