import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const regex = /\d/;
  return regex.test(value) ? null : { noNumber: true };
}
