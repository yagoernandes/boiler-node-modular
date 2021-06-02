import { ValidationErrors } from 'validatorjs';

export default class ValidatorError {
  public errors: ValidationErrors;

  constructor(errors: ValidationErrors) {
    this.errors = errors;
  }
}
