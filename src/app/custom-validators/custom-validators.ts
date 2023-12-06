import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static forbiddenSearchTermValidator(forbiddenTerm: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const searchTerm = control.value?.toLowerCase();
      if (searchTerm === forbiddenTerm.toLowerCase()) {
        return { forbiddenSearchTerm: true };
      }
      return null;
    };
  }
}
