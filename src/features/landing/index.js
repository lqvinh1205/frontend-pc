import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../stores/app.slice";

const LandingPage = (prop) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("i18n") || "vn"
  );

  const onChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
    setLanguage(e.target.value);
  };

  return (
    <div>
      LandingPage: {t("welcome")}
      <select onChange={onChangeLanguage} value={language}>
        <option value="vn">VN</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

export default LandingPage;
