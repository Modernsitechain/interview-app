import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {
  public appButton = input<
    | 'primary'
    | 'solid'
    | 'secondary'
    | 'blur'
    | 'outline'
    | 'text'
    | 'link'
    | 'danger'
    | ''
  >('primary');
  public readonly size = input<'lg' | 'md' | 'sm'>('md');
  public readonly rounded = input<'none' | 'md' | 'full' | 'circle'>('md');
  public readonly loading = input(false);
  public readonly square = input(false);
  public readonly shrink = input(false);
  public readonly stretch = input(false);
  public readonly clicked = input(false);
  // public readonly shadow = input<boolean>(false);
  public readonly isDisabled = input(false);

  @HostBinding('disabled')
  public get disabled(): boolean {
    return this.isDisabled();
  }

  @HostBinding('class')
  get hostClass(): string {
    const classes = ['button'];
    if (this.appButton() || this.appButton() == '') {
      const variant = this.appButton() === '' ? 'primary' : this.appButton();
      classes.push(`variant-${variant}`);
    }

    if (this.square()) {
      if (this.rounded() !== 'circle') {
        classes.push(`rounded-md`);
      }
    } else {
      classes.push(`rounded-${this.rounded()}`);
    }

    classes.push(this.size());

    if (this.loading()) {
      classes.push(`btn-loading`);
    }

    if (this.square()) {
      classes.push(`btn-square`);
    }

    if (this.shrink()) {
      classes.push(`btn-shrink`);
    }

    if (this.stretch()) {
      classes.push(`btn-stretch`);
    }

    if (this.clicked()) {
      classes.push(`btn-clicked`);
    }

    return classes.join(' ');
  }
}
