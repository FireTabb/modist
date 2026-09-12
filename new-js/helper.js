import { TIMEOUT_SEC } from "./config";
import { AppError } from "./behaviors/errorHandling/AppError";
import { ERROR_CODES } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new AppError(ERROR_CODES.TIMEOUT_ERROR));
    }, s * 1000);
  });
};

export const AJAX = async function (url, requestData) {
  try {
    const fetchPro = requestData
      ? fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new AppError(ERROR_CODES.NETWORK_ERROR, res.status);
    }
    return data;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(ERROR_CODES.NETWORK_ERROR);
  }
};
