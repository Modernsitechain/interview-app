import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const dropdownMenuAnimations: {
  readonly indicatorRotate: AnimationTriggerMetadata;
} = {
  /** Animation that rotates the indicator arrow. */
  indicatorRotate: trigger('indicatorRotate', [
    state('false, void', style({ transform: 'rotate(0deg)' })),
    state('true', style({ transform: 'rotate(180deg)' })),
    transition('false <=> true, void => false', animate(ANIMATION_TIMING)),
  ]),
};
