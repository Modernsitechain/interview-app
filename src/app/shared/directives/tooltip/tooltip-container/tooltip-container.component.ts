import {
  Component,
  Inject,
  InjectionToken,
  TemplateRef,
  HostBinding,
  OnInit,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

export type TooltipVariant = 'default' | 'light';
export interface TooltipData {
  tooltip: string | TemplateRef<void>;
  variant: TooltipVariant;
  hasBackdrop: boolean;
}
export const TOOLTIP_DATA = new InjectionToken<TooltipData>('TOOLTIP_DATA');
export const OVERLAY_REF = new InjectionToken<OverlayRef>('OVERLAY_REF');
@Component({
  selector: 'app-tooltip-container',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './tooltip-container.component.html',
  styleUrls: ['./tooltip-container.component.scss']
})
export class TooltipContainerComponent implements OnInit, OnDestroy {
  menuItemSelected: any;
  @HostBinding('class.text-only')
  public get textOnly(): boolean {
    return !!this.text;
  }

  @HostBinding('class.default') get isDefault() {
    return this.variant === 'default';
  }

  @HostBinding('class.light') get isLight() {
    return this.variant === 'light';
  }

  public get text(): string | undefined {
    return typeof this.tooltipData.tooltip === 'string'
      ? this.tooltipData.tooltip
      : undefined;
  }

  public get template(): TemplateRef<void> | undefined {
    return this.tooltipData.tooltip instanceof TemplateRef
      ? this.tooltipData.tooltip
      : undefined;
  }

  public get variant(): TooltipVariant | undefined {
    return this.tooltipData.variant;
  }

  private backDropSubscription?: Subscription;

  constructor(
    @Inject(TOOLTIP_DATA) public tooltipData: TooltipData,
    private overlayRef: OverlayRef
  ) {}
  public ngOnInit(): void {
    if (this.tooltipData.hasBackdrop) {
      this.backDropSubscription = this.overlayRef
        .backdropClick()
        .subscribe(() => {
          if (this.overlayRef?.hasAttached()) {
            this.overlayRef?.detach();
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this.backDropSubscription?.unsubscribe();
  }
}
