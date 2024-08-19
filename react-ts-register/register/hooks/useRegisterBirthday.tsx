import zustandStore from '../../../store/store.tsx';
import React, { useState } from 'react';

const useRegisterBirthday = () => {
  const [errMsg, setErrMsg] = useState<string>('');
  const {
    r_year,
    r_month,
    r_day,
    r_setYear,
    r_setMonth,
    r_setDay,
    r_backPage,
    r_nextPage,
  } = zustandStore();

  const inputHandler =
    (setState: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const regex = /^\d*$/;

      if (regex.test(value)) {
        setState(value);
      }
    };

  const cancelHandler = () => {
    r_backPage();
  };

  const yearCheck = () => {
    const currentYear = new Date().getFullYear();
    const year = parseInt(r_year, 10);

    return year > 1920 && year <= currentYear && r_year.length === 4;
  };

  const monthCheck = () => {
    const month = parseInt(r_month, 10);

    if (month >= 1 && month <= 12) {
      if (r_month.length === 1) {
        r_setMonth('0' + r_month);
      }
      return true;
    }
    return false;
  };

  const dayCheck = () => {
    const day = parseInt(r_day, 10);

    if (day >= 1 && day <= 31) {
      if (r_day.length === 1) {
        r_setDay('0' + r_day);
      }
      return true;
    }
    return false;
  };

  const nextHandler = () => {
    yearCheck() && monthCheck() && dayCheck()
      ? r_nextPage()
      : setErrMsg('생년월일을 정확하게 입력해주세요');
  };

  return {
    inputYearHandler: inputHandler(r_setYear),
    inputMonthHandler: inputHandler(r_setMonth),
    inputDayHandler: inputHandler(r_setDay),
    cancelHandler,
    nextHandler,
    errMsg,
  };
};

export default useRegisterBirthday;
