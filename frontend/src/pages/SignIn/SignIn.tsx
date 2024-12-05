import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { AuthData } from "../../entities/user/user.types";
import EyeClosed from "../../shared/assets/icons/EyeClosed.svg";
import EyeOpen from "../../shared/assets/icons/EyeOpen.svg";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import { Header } from "../../widgets/Header/Header";
import { SignSwiper } from "../../widgets/SignSwiper/SignSwiper";
import styles from "./SignIn.module.css";

//TODO: enable by .env flag on dev/stage only
const QASignIn = ({
  login,
  reset,
}: {
  login: (data: AuthData, reset: () => void) => void;
  reset: () => void;
}) => {
  const testLogin = (string: string) => {
    if (string === "admin") {
      login(
        {
          email: "menome333@abatido.com",
          password: "123456Ab",
        },
        reset
      );
    }

    if (string === "moder") {
      login(
        {
          email: "lokaf94657@asaud.com",
          password: "123456Ab",
        },
        reset
      );
    }

    if (string === "verified") {
      login(
        {
          email: "mm123456@gmail.com",
          password: "Mm123456",
        },
        reset
      );
    }

    if (string === "not_verified") {
      login(
        {
          email: "nn123456@gmail.com",
          password: "Nn123456",
        },
        reset
      );
    }
  };

  return (
    <span>
      TEST LOGIN
      {" | "}
      <button onClick={() => testLogin("admin")}>Admin</button>
      {" | "}
      <button onClick={() => testLogin("moder")}>Moder</button>
      {" | "}
      <button onClick={() => testLogin("verified")}>Verified</button>
      {" | "}
      <button onClick={() => testLogin("not_verified")}>Not verified</button>
      {" | "}
    </span>
  );
};

export function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthData>();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, errorMessage, login, clearMessage } = useUserStore();

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, [clearMessage]);

  const onSubmit: SubmitHandler<AuthData> = (data) => login(data, reset);

  return (
    <div className={styles.container}>
      <Header title="Sign In" />

      <div className={styles.content}>
        <SignSwiper />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <span className={styles.formTitle}>Sign In</span>

            <div className={styles.inputContainer}>
              <label className={`${errors.email && styles.labelError} ${styles.label}`}>
                Email
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    isEmail: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address",
                  },
                })}
                placeholder="Your Email Address"
                className={`${errors.email && styles.inputError} ${styles.input}`}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label className={`${errors.password && styles.labelError} ${styles.label}`}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Your Password"
                  className={`${errors.password && styles.inputError} ${styles.input}`}
                />
                <button
                  type="button"
                  className={styles.showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="toggle password visibility"
                >
                  {showPassword ? (
                    <img src={EyeClosed} alt="show Pasword" />
                  ) : (
                    <img src={EyeOpen} alt="hide Password" />
                  )}
                </button>
              </div>
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            <div className={styles.forgot}>
              <Link to="/forgot-password" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            <BaseButton disabled={loading} type="submit">
              Sign In
            </BaseButton>

            <div className={styles.status}>
              {error && <p className={styles.error}>{errorMessage}</p>}
            </div>

            <div className={styles.text}>
              Don’t have an account?{" "}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </div>

            {/* TEST LOGIN DELETE AFTER FINISH DEVELOPMENT --------------------------------------- */}
            <QASignIn login={login} reset={reset} />
            {/* TEST LOGIN DELETE AFTER FINISH DEVELOPMENT --------------------------------------- */}
          </form>
        </div>
      </div>
    </div>
  );
}
