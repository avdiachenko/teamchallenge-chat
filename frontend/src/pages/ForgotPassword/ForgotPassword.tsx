import { SubmitHandler, useForm } from "react-hook-form";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import { SignSwiper } from "../../shared/components/SignSwiper/SignSwiper";
import { Header } from "../../widgets/Header/Header";
import styles from "./ForgotPassword.module.css";

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = (data) => alert(JSON.stringify(data));

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

            <BaseButton type="submit">Confirm</BaseButton>
          </form>
        </div>
      </div>
    </div>
  );
}
