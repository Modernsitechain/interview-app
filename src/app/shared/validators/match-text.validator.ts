import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchExactTextValidator(expectedText: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value !== expectedText) {
      return { textMismatch: true };
    }

    return null;
  };
}
