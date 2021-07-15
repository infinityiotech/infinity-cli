import { AdProfileSnapshotIconComponent } from 'projects/ad-dashboard-applications/ad-profile/src/app/snapshot-icon/snapshot-icon.component';
import { NgModule } from '@angular/core';
import { QuickReferenceSlotService } from 'projects/ad-dashboard/src/app/shared/component-slots/quick-reference-slot.service';
import { AdSlotItem } from '@ad/toolkit/ad-slot/model/ad-slot-item';

@NgModule({
  declarations: [
  ],
  imports: [
    AdProfileSnapshotIconComponent
  ]
})
export class <%= classify(name) %>AdDashboardSlotsModule {
  constructor(
    private quickReferenceSlot: QuickReferenceSlotService
  ) { 
    this.quickReferenceSlot.add(new AdSlotItem({ component: AdProfileSnapshotIconComponent } as AdSlotItem));
  }
 }
