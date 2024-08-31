import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_URL } from "../../shared/constants/urls";
import { Header } from "../../widgets/Header/Header";
import styles from "./SignIn.module.css";

interface IFormInput {
  email: string;
  password: string;
}

interface loginData {
  token: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

export function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const [loginError, setLoginError] = useState(false);
  const [loginRequest, setLoginRequest] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoginError(false);
    setLoginSuccess(false);
    setLoginRequest(true);

    fetch(BASE_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        setLoginSuccess(true);
        reset();
        return res.json();
      })
      .then((data: loginData) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        setLoginError(true);
      })
      .finally(() => {
        setLoginRequest(false);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                validate: {
                  isEmail: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address",
                },
              })}
              placeholder="Email"
              className={styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              placeholder="Password"
              className={styles.input}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <input type="submit" value="Sign In" disabled={loginRequest} className={styles.submit} />
        </form>

        <div className={styles.status}>
          {loginRequest && <p className={styles.request}>Login request</p>}
          {loginError && <p className={styles.error}>Login error</p>}
          {loginSuccess && <p className={styles.success}>Login success</p>}
        </div>
      </div>
    </div>
  );
}
