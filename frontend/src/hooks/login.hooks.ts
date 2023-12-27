import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IUseLoginForm {
  handleSubmit: (email: string, password: string) => Promise<void>;
  alert: IAlert | undefined;
}

interface IAlert {
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export function useLoginForm(): IUseLoginForm {
  const [alert, setAlert] = useState<IAlert>();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://binar-rental-backend-app.fly.dev/api/user/login",
        { email, password }
      );

      const { token } = response.data;

      localStorage.setItem("token", `Bearer ${token}`);

      setAlert({
        message: "Login success!",
        severity: "success",
      });
      navigate("/management/products");
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({
          message: error?.response?.data?.message || "An error occurred",
          severity: "error",
        });
      }
      setAlert({
        message: "Failed",
        severity: "error",
      });
    }
  };

  return { handleSubmit, alert };
}
