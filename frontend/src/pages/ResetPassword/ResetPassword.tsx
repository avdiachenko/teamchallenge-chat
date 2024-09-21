import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import EyeClosed from "../../shared/assets/icons/EyeClosed.svg";
import EyeOpen from "../../shared/assets/icons/EyeOpen.svg";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import { SignSwiper } from "../../shared/components/SignSwiper/SignSwiper";
import { Header } from "../../widgets/Header/Header";
import styles from "./ResetPassword.module.css";

export function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<{ password: string; repeatPassword: string }>();

  const { tempCode } = useParams();

  const { error, errorMessage, loading, success, updatePassword, clearMessage } = useUserStore();

  useEffect(() => () => clearMessage(), [clearMessage]);

  const [showPassword, setShowPassword] = useState(false);

  if (!tempCode) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<{ password: string; repeatPassword: string }> = (data) =>
    updatePassword(tempCode, data.password, reset);

  return (
    <div className={styles.container}>
      <Header title="Reset Password" />

      <div className={styles.content}>
        <SignSwiper />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <span className={styles.formTitle}>Reset Password</span>

            <div className={styles.inputContainer}>
              <label className={`${errors.password && styles.labelError} ${styles.label}`}>
                New Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 256,
                      message: "Password must be at most 256 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,256}$/,
                      message:
                        "Must contain one uppercase letter, one lowercase letter and one number",
                    },
                  })}
                  placeholder="Enter New Password"
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

            <div className={styles.inputContainer}>
              <label className={`${errors.password && styles.labelError} ${styles.label}`}>
                Repeat Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("repeatPassword", {
                    required: "Password is required",
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}
                  placeholder="Repeat Password"
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
              {errors.repeatPassword && (
                <p className={styles.error}>{errors.repeatPassword.message}</p>
              )}
            </div>

            <BaseButton disabled={loading} type="submit">
              Confirm
            </BaseButton>

            <div className={styles.status}>
              {error && <p className={styles.error}>{errorMessage}</p>}
              {success && <p className={styles.success}>Password updated successfully</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
