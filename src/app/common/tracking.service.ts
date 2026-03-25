import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  pushEvent(eventName: string, data?: any) {

    const dataLayer = this.getDataLayer();
    if (!dataLayer) return;

    dataLayer.push({
      event: eventName,
      ...data
    });
  }

  private getDataLayer(): any[] | null {

    if (!isPlatformBrowser(this.platformId)) return null;

    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    return win.dataLayer;
  }

}
