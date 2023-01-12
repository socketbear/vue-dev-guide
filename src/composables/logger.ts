/* eslint no-console: 0 */
const DEBUG_MODE = import.meta.env.VITE_ENV_LOGGER === 'Y'
// if (process.env.NODE_ENV !== 'development') {
//   DEBUG_MODE = false;
// }
const PREFIX = {
  START: '[UI START]',
  END: '[UI END]',
  INFO: '[UI]',
}

const logger = {
  // 로딩 간 로딩 내역 출력 전용
  start(label: string, ...logParams: any) {
    if (!DEBUG_MODE)
      return
    console.time(label)
    console.log(PREFIX.START, ...logParams)
  },
  end(label: string, ...logParams: any) {
    if (!DEBUG_MODE)
      return
    console.timeEnd(label)
    console.log(PREFIX.END, ...logParams)
  },
  info(...logParams: any) {
    if (!DEBUG_MODE)
      return
    console.log(PREFIX.INFO, ...logParams)
  },
}

export const useLogger = () => {
  return logger
}
