import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }


    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const isValid = specialCharacterRegex.test(value);
    return isValid ? null : { specialCharacter: true };
  };
}
