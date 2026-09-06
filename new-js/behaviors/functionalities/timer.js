// const timer

// export const secondsCounter = async function (
//   timeInSeconds = 120,
//   callback,
//   clear = false,
// ) {
//   const endTime = Date.now() + timeInSeconds * 1000;

//   let previousSeconds = timeInSeconds;

//   const timer = setInterval(() => {

//     const reamaining = Math.max(0, endTime - Date.now());
//     const seconds = Math.ceil(reamaining / 1000);

//     if (seconds !== previousSeconds) {
//       previousSeconds = seconds;
//       callback(seconds);
//     }

//     if (reamaining <= 0) {
//       clearInterval(timer);
//     }
//   }, 500);
// };
let timer = null;

const startTimer = (callback, endTime) => {
  let previousSeconds = Math.ceil(Math.max(0, endTime - Date.now()) / 1000);

  timer = setInterval(() => {
    const remaining = Math.max(0, endTime - Date.now());
    const seconds = Math.ceil(remaining / 1000);

    if (seconds !== previousSeconds) {
      previousSeconds = seconds;
      callback(seconds);
    }

    if (remaining <= 0) {
      clearTimer();
    }
  }, 500);
};

export const secondsCounter = (timeInSeconds = 120, callback) => {
  const endTime = Date.now() + timeInSeconds * 1000;

  startTimer(callback, endTime);
};

export const clearTimer = () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
};
