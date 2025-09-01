import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasUppercaseValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const regex = /[A-Z]/;
  return regex.test(control.value) ? null : { noUppercase: true };
}
