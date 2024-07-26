import { useState } from "react";
export const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: "", type: "danger" });

  const showAlert = ({ text, type = "danger" }: any) =>
    setAlert({ show: true, text, type });
  const hideAlert = ({ text, type = "danger" }: any) =>
    setAlert({ show: false, text: "", type: "danger" });

  return { alert, showAlert, hideAlert };
};
