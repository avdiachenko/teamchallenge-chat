import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUserStore } from "@/entities/user/user.store";
import { BaseButton } from "@/shared/components/BaseButton/BaseButton";
import { Header } from "@/widgets/Header/Header";
import { SignSwiper } from "@/widgets/SignSwiper/SignSwiper";

import styles from "./ForgotPassword.module.css";

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>();

  const { error, errorMessage, loading, success, forgotPassword, clearMessage } = useUserStore();

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, [clearMessage]);

  const onSubmit: SubmitHandler<{ email: string }> = (data) => forgotPassword(data.email, reset);

  return (
    <div className={styles.container}>
      <Header title="Forgot Password" />

      <div className={styles.content}>
        <SignSwiper />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <span className={styles.formTitle}>Forgot Password</span>

            <div className={styles.text}>
              Enter the email address you used when you joined and we’ll send you instructions to
              reset your password.
            </div>

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

            <BaseButton disabled={loading} type="submit">
              Confirm
            </BaseButton>

            <div className={styles.status}>
              {error && <p className={styles.error}>{errorMessage}</p>}
              {success && (
                <p className={styles.success}>
                  Check your email and follow the instructions to reset your password
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
