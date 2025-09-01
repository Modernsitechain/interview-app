import { effect, inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastr = inject(ToastrService);

  public success = signal<string | undefined>(undefined);
  public warn = signal<string | undefined>(undefined);
  public error = signal<string | undefined>(undefined);

  constructor() {
    effect(() => {
      if (this.success()) {
        this.toastr.success(this.success(), 'Success');
      }

      if (this.warn()) {
        this.toastr.warning(this.warn(), 'Warning');
      }

      if (this.error()) {
        this.toastr.error(this.error(), 'Error');
      }
    });
  }
}
