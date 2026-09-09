import { TIMEOUT_SEC } from "./config";
import { AppError } from "./behaviors/errorHandling/AppError";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const fetchPro = await fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new AppError("SERVER_ERROR", `خطای سرور : ${res.status}`, res.status);
    }
    return data;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError("NETWORK_ERROR", "خطا در ارتباط با سرور");
  }
};
