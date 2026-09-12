export class AppError extends Error {
  constructor(code, status = null) {
    super(code);

    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
  }
}
