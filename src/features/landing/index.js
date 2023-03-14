import { t } from "i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage as testFn, changeText } from "../../stores/reducers";

const LandingPage = (prop) => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  console.log(store);
  const changeLanguage = () => {
    dispatch(testFn());
    dispatch(changeText());
  };
  return (
    <div>
      LandingPage: {t("welcome")} <br />
      <button onClick={changeLanguage}>Change language</button>
      <h1>{store.text}</h1>
    </div>
  );
};

export default LandingPage;
