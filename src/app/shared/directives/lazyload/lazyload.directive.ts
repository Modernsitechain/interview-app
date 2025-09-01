import {
  Directive,
  OnChanges,
  Output,
  EventEmitter,
  Input,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appLazyload]',
  standalone: true
})
export class LazyloadDirective<T> implements OnChanges {
  @Output()
  public scrollEvent: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

  @Output()
  public reachedBottom = new EventEmitter<void>();

  @Input()
  public dataSource?: Array<T>;

  @Input()
  public limit = 50;

  @Input()
  public page = 1;

  public data!: Array<T>;

  @HostListener('scroll', ['$event'])
  onListenerTriggered(event: Event): void {
    if (event.target) {
      const target = event.target as HTMLElement;

      this.onScroll(target);
    }
  }

  public ngOnChanges(): void {
    this.page = 1;
    this.data = this.getData(this.page, this.limit);
    this.updateIndex();

    this.scrollEvent.emit(this.data);
  }

  public onScroll(target: HTMLElement) {
    const tableViewHeight: number = target.offsetHeight;
    const tableScrollHeight: number = target.scrollHeight;
    const scrollLocation: number = target.scrollTop;

    if (scrollLocation + tableViewHeight >= tableScrollHeight) {
      this.reachedBottom.emit(); // emit event reachedBottom
    }

    const buffer = 200;

    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit) {
      const data = this.getData(this.page, this.limit);
      this.data = this.data.concat(data);
      this.updateIndex();
      this.scrollEvent.emit(this.data);
    }
  }

  private getData(page: number, limit: number): Array<T> {
    if (this.dataSource) {
      return this.dataSource.filter(
        (__, index) => index >= (page - 1) * limit && index < page * limit
      );
    }

    return [];
  }

  private updateIndex() {
    this.page++;
  }
}
