import { Button } from "@mui/joy";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { AuthData } from "../../entities/user/user.types";
import { SignSwiper } from "../../shared/components/SignSwiper/SignSwiper";
import { Header } from "../../widgets/Header/Header";
import styles from "./SignIn.module.css";

export function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthData>();

  const { name, loading, error, errorMessage, login, clearMessage } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (name) navigate("/chat", { replace: true });
  }, [name, navigate]);

  useEffect(() => clearMessage(), [clearMessage]);

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
              <label className={styles.label}>Email</label>
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
                className={styles.input}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Your Password"
                className={styles.input}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            <div className={styles.forgot}>
              <Link to="/signup" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              sx={{
                width: "100%",
                fontSize: "20px",
                fontWeight: 500,
                color: "var(--white-color)",
                background: "var(--purple-color-600)",
                borderRadius: "60px",
                padding: "14px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                "&:hover": {
                  background: "var(--secondary-color)",
                },
              }}
            >
              Sign Up
            </Button>

            <div className={styles.status}>
              {error && <p className={styles.error}>{errorMessage}</p>}
            </div>

            <div className={styles.text}>
              Don’t have an account?{" "}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
