import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpacesAllowedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value === 'string' && /\s/.test(value)) {
      return { spacesNotAllowed: true };
    }

    return null;
  };
}
