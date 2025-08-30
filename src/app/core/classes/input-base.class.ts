import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlStatus } from '@core/enums';
import { IconName } from '@shared/components/icon/icon.component';

@Directive()
export abstract class InputBaseClass implements AfterViewInit {
  @ViewChild('inputElement')
  public inputElement?: ElementRef<HTMLInputElement>;

  @Input()
  public control = new FormControl();

  @Input()
  public autofocus = false;

  @Input()
  public placeholder?: string;

  @Input()
  public hideValidation = false;

  @Input()
  public hideBorder = false;

  @Input()
  @HostBinding('class.has-icon')
  public icon?: IconName;

  @Output()
  public iconClicked = new EventEmitter<void>();

  @HostBinding('class.invalid')
  public get isInvalid(): boolean {
    return this.control.invalid;
  }

  @HostBinding('class.valid')
  public get isValid(): boolean {
    return this.control.valid;
  }

  @HostBinding('class.pending')
  public get isPending(): boolean {
    return this.control.pending;
  }

  @HostBinding('class.disabled')
  public get isDisabled(): boolean {
    return this.control.disabled;
  }

  @HostBinding('class.danger')
  public get danger(): boolean {
    if (!this.control.touched || this.hideValidation) {
      return false;
    }

    return this.control.status === FormControlStatus.Invalid;
  }

  public get variantIcon(): IconName | undefined {
    if (this.control.pending) {
      return 'saxRotateLeftOutline';
    }
    if (this.icon) {
      return this.icon;
    }
    return undefined;
  }

  public disable(): void {
    this.control.disable();
  }

  public reset(value?: unknown): void {
    this.control.reset(value);
  }

  public clear(): void {
    this.control.setValue(null);
    this.control.markAsTouched();
    this.control.markAsDirty();
  }

  public focus(): void {
    this.inputElement?.nativeElement.focus();
  }

  public blur(): void {
    this.inputElement?.nativeElement.blur();
  }

  public onIconClick(): void {
    this.iconClicked.emit();
  }

  public ngAfterViewInit(): void {
    if (this.autofocus) {
      this.focus();
    }
  }
}
