export const API = "http://localhost:3000";

export const TIMEOUT_SEC = 5;

export const HTTP_STATUS = {
  // درخواست نا معتبر (داده ی فرستاده شده مشکل داره)
  BAD_REQUEST: 400,
  // احراز هویت ناموفق (کاربر وارد نشده یا credentials معتبر نیست)
  UNAUTHORIZED: 401,
  // درخواست معتبر است ولی مجوز به انجامش نیست
  FORBIDDEN: 403,
  // پیدا نشد
  NOT_FOUND: 404,
  // مثلا username از قبل وجود داره
  CONFLICT: 409,
  // داده وارد شده نا معتبر است مثلا رمز عبور فقط عدد است
  UNPROCESSABLE_ENTITY: 422,
  // خطای سمت سرور
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_CODES = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  STORAGE_ERROR: "STORAGE_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  SERVER_ERROR: "SERVER_ERROR",
  INVALID_PRODUCT_ID: "INVALID_PRODUCT_ID",
};
