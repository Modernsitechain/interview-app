import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subscription, merge } from 'rxjs';

export const PositionMap: { [key: string]: Array<ConnectedPosition> } = {
  bottomLeft: [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    }
  ],
  bottomRight: [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ],
  top: [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    }
  ],
  topCenter: [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    }
  ],
  bottomCenter: [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ],
  bottom: [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ]
};

export type Positions =
  | 'top'
  | 'topCenter'
  | 'bottom'
  | 'bottomCenter'
  | 'bottomRight'
  | 'bottomLeft';
@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective implements OnDestroy {
  @Input({ alias: 'appDropdown', required: true })
  public templateRef!: TemplateRef<unknown>;

  @Input()
  public offsetY?: number;

  @Input()
  public offsetX?: number;

  @Input()
  public width?: string | number;

  @Input()
  public closeOnClick = false;

  @Input()
  public position: Positions = 'bottom';

  @Output()
  public readonly closed = new EventEmitter<void>();

  @Output()
  public readonly opened = new EventEmitter<void>();

  @HostListener('click')
  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private overlayRef?: OverlayRef;
  private isOpen = false;

  private subs: Array<Subscription> = [];

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  private open(): void {
    this.isOpen = true;
    this.opened.emit();

    const overlayConfig = this.getOverlayConfig();
    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.attach(
      new TemplatePortal(this.templateRef, this.viewContainerRef)
    );

    this.subs.push(
      this.getDropdownClosingActions(this.overlayRef).subscribe(() => {
        this.close();
      })
    );
  }

  public close(): void {
    if (!this.overlayRef) {
      return;
    }

    this.isOpen = false;
    this.subs.forEach((s) => s.unsubscribe());
    this.overlayRef.detach();
    this.closed.emit();
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withLockedPosition()
        .withPositions(PositionMap[this.position])
        .withDefaultOffsetX(this.offsetX ? this.offsetX : 0)
        .withDefaultOffsetY(this.offsetY ? this.offsetY : 0),
      width: this.width || this.elementRef.nativeElement.offsetWidth,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
  }

  private getDropdownClosingActions(
    overlayRef: OverlayRef
  ): Observable<MouseEvent | void> {
    return merge(overlayRef.backdropClick(), overlayRef.detachments());
  }
}
