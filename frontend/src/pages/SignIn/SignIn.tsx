import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { AuthData } from "../../entities/user/user.types";
import { Header } from "../../widgets/Header/Header";
import styles from "./SignIn.module.css";

export function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthData>();

  const { name, loading, error, errorMessage, login } = useUserStore();

  const onSubmit: SubmitHandler<AuthData> = (data) => {
    login(data);
    reset();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (name) navigate("/chat", { replace: true });
  }, [name, navigate]);

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

          <input type="submit" value="Sign In" disabled={loading} className={styles.submit} />
        </form>

        <div className={styles.status}>
          {loading && <p className={styles.request}>Login request</p>}
          {error && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
