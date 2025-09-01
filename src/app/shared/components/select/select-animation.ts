import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const CHEVRON_TIMER = '225ms cubic-bezier(0.4,0.0,0.2,1)';

export const selectAnimation: {
  readonly chevronRotate: AnimationTriggerMetadata;
} = {
  /** Animation that rotates the indicator arrow. */
  chevronRotate: trigger('chevronRotate', [
    state('closed, void', style({ transform: 'rotate(0deg)' })),
    state('opened', style({ transform: 'rotate(180deg)' })),
    transition('opened <=> closed, void => closed', animate(CHEVRON_TIMER))
  ])
};
