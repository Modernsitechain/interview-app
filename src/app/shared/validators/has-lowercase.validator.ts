import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasLowercaseValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const regex = /[a-z]/;
  return regex.test(control.value) ? null : { noLowercase: true };
}
