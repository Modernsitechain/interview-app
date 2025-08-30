import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  input,
  Input,
  OnDestroy,
  output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {
  TOOLTIP_DATA,
  TooltipContainerComponent
} from './tooltip-container/tooltip-container.component';
import { Observable, Subscription, merge, timer } from 'rxjs';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  public tooltipValue = output();
  public enabled = input<boolean>(true);

  @Input()
  public appTooltip!: string | TemplateRef<void>;

  @Input()
  public variant: 'default' | 'light' = 'default';

  @Input()
  public hasBackdrop = false;

  @Input({ required: true })
  public width!: string | number;

  @Input()
  public type: 'hover' | 'activate' = 'hover';

  public duration = 1250; // duration in milliseconds
  private overlayRef!: OverlayRef;

  private timerSubscription?: Subscription;
  private subs: Array<Subscription> = [];

  constructor(
    private element: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private builder: OverlayPositionBuilder,
    private viewContainer: ViewContainerRef
  ) {}

  public ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  public activateTooltip(): void {
    if (this.overlayRef?.hasAttached()) {
      this.close();
      this.timerSubscription?.unsubscribe();
    }
    this.attachTooltip();
    this.timerSubscription = timer(this.duration).subscribe(() => {
      this.close();
    });
  }

  @HostListener('click')
  public showTooltipClick(): void {
    if (this.type !== 'activate') {
      return;
    }

    if (this.overlayRef?.hasAttached()) {
      return;
    }

    this.attachTooltip();
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  public showTooltip(): void {
    if (this.type === 'activate') {
      return;
    }

    if (this.overlayRef?.hasAttached()) {
      return;
    }

    if (!this.enabled()) {
      return;
    }

    this.tooltipValue.emit();
    this.attachTooltip();
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  public hideToolTip(): void {
    if (!this.enabled()) {
      return;
    }

    if (!this.hasBackdrop && this.type !== 'activate') {
      this.close();
    }
  }

  @HostBinding('class.tooltip')
  public get tooltip(): boolean {
    return true;
  }

  @HostBinding('class.active')
  public get tooltipActive(): boolean {
    return !!this.overlayRef?.hasAttached();
  }

  public close(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      this.subs.forEach((s) => s.unsubscribe());
    }
  }

  private attachTooltip(): void {
    const positionStrategy = this.getPositionStrategy();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: this.hasBackdrop,
      backdropClass: this.hasBackdrop ? 'no-backdrop' : undefined,
      width: this.width
    });

    const injector = Injector.create({
      providers: [
        {
          provide: TOOLTIP_DATA,
          useValue: {
            tooltip: this.appTooltip,
            variant: this.variant,
            hasBackdrop: this.hasBackdrop
          }
        },
        {
          provide: OverlayRef,
          useValue: this.overlayRef
        }
      ]
    });
    const component = new ComponentPortal(
      TooltipContainerComponent,
      this.viewContainer,
      injector
    );
    this.overlayRef.attach(component);

    this.subs.push(
      this.getDropdownClosingActions(this.overlayRef).subscribe(() => {
        this.close();
      })
    );
  }

  private getPositionStrategy(): PositionStrategy {
    return this.builder.flexibleConnectedTo(this.element).withPositions([
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        panelClass: 'top'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        panelClass: 'bottom'
      }
    ]);
  }

  private getDropdownClosingActions(
    overlayRef: OverlayRef
  ): Observable<MouseEvent | void> {
    return merge(overlayRef.backdropClick(), overlayRef.detachments());
  }
}
