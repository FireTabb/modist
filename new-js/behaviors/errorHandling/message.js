export const messages = {
  errors: {
    USER_NOT_FOUND: "کاربری با این مشخصات یافت نشد",
    INVALID_CREDENTIALS: "نام کاربری یا رمز عبور اشتباه است",
    NETWORK_ERROR: "اتصال به سرور برقرار نیست",
    STORAGE_ERROR: "خطا در ذخیره اطلاعات",
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
  if (err.status >= 500) return "خطای سرور. لطفاً بعداً تلاش کنید";
  return err.message || "خطای غیرمنتظره";
}