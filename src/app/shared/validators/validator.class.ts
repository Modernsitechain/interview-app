import { Validators as NgValidators } from '@angular/forms';
import { matchPasswordValidator } from './match-password.validator';
import { specialCharacterValidator } from './special-character.validator';
import { hasNumberValidator } from './has-number.validator';
import { hasLowercaseValidator } from './has-lowercase.validator';
import { hasUppercaseValidator } from './has-uppercase.validator';
import { matchExactTextValidator } from './match-text.validator';
import { noSpacesAllowedValidator } from './no-space.validator';

export class Validators {
  // Map built-in Angular form validators
  public static minLength = NgValidators.minLength;
  public static maxLength = NgValidators.maxLength;
  public static required = NgValidators.required;
  public static requiredTrue = NgValidators.requiredTrue;
  public static email = NgValidators.email;
  public static min = NgValidators.min;
  public static max = NgValidators.max;
  public static matchPassword = matchPasswordValidator;
  public static specialCharacter = specialCharacterValidator;
  public static hasNumber = hasNumberValidator;
  public static hasUppercase = hasUppercaseValidator;
  public static hasLowecase = hasLowercaseValidator;
  public static matchText = matchExactTextValidator;
  public static noSpace = noSpacesAllowedValidator;
}
