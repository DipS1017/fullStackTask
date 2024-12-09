export abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorType: string;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; property?: string }[];
}

export class ValidationError extends CustomError {
  errorCode = 400;
  errorType = "Validation Error";

  constructor(
    message: string,
    private property?: string,
  ) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message, property: this.property }];
  }
}
export class NotFoundError extends CustomError {
  errorCode = 404;
  errorType = "NotFoundError";

  constructor(
    message: string,
    private property?: string,
  ) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message, property: this.property }];
  }
}
export class UnauthorizedError extends CustomError {
  errorCode = 401;
  errorType = "unauthorized Error";

  constructor(
    message: string,
    private property?: string,
  ) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message, property: this.property }];
  }
}
