import { ERROR_CODES } from "../../config";

export const messages = {
  errors: {
    [ERROR_CODES.USER_NOT_FOUND]: "کاربری با این مشخصات یافت نشد",
    [ERROR_CODES.INVALID_CREDENTIALS]: "نام کاربری یا رمز عبور اشتباه است",
    [ERROR_CODES.NETWORK_ERROR]: "اتصال به سرور برقرار نیست",
    [ERROR_CODES.STORAGE_ERROR]: "خطا در ذخیره اطلاعات",
    [ERROR_CODES.TIMEOUT_ERROR]: "پاسخ سرور بیش از حد طول کشید",
    [ERROR_CODES.UNAUTHORIZED]: "لطفاً ابتدا وارد حساب کاربری خود شوید",
    [ERROR_CODES.SERVER_ERROR]: "خطای سرور. لطفاً بعداً تلاش کنید",
    [ERROR_CODES.INVALID_PRODUCT_ID]: "شناسه محصول نامعتبر است",
  },

  success: {
    LOGIN_SUCCESS: "ورود موفق",
    SIGNUP_SUCCESS: "ثبت‌نام با موفقیت انجام شد",
    LOGOUT_SUCCESS: "خروج با موفقیت انجام شد",
  },

  condition: {
    CONFIRM_LOGOUT: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
    CONFIRM_DELETE: "آیا از حذف این آیتم مطمئن هستید؟",
  },
};

export function getErrorMessage(err) {
  if (err.code && messages.errors[err.code]) {
    return messages.errors[err.code];
  }

  return "خطای غیرمنتظره";
}
