// lead-modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeadModalService {
  private _open = new Subject<boolean>();
  open$ = this._open.asObservable();

  open() { this._open.next(true); }
  close() { this._open.next(false); }
}