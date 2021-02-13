import { AbstractControl } from '@angular/forms';


/**
 *
 * @param abstractControl
 * This method returns checks if a field is required
 */
export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({}as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if (abstractControl['controls']) {
    for (const controlName in abstractControl['controls']) {
      if (abstractControl['controls'][controlName]) {
        if (hasRequiredField(abstractControl['controls'][controlName])) {
          return true;
        }
      }
    }
  }
  return false;
}



/**
 *
 * @param formIsValid
 * This method sets the class on a submit button based on form validation
 */
export const  setValidationClass = (formIsValid): string => {
  return formIsValid ? 'btn btn-success' : 'btn btn-primary';
}
