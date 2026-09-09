export class AppError extends Error {
  constructor(code, message, status = null) {
    // باعث میشود stack trace (دو کار مهم دیگه هم انجام میده)یا به زبان دیگر جایی که خطا از آن سرچشمه گرفته درست نمایش داده شود
    super(message);
    // باعث میشود نام کلاسی که با آن ساخته شده به عنوان نام ثبت شود
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
  }
}
