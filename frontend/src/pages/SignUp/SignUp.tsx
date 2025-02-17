import { Checkbox } from "@mui/joy";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { RegistrationData } from "../../entities/user/user.types";
import EyeClosed from "../../shared/assets/icons/EyeClosed.svg";
import EyeOpen from "../../shared/assets/icons/EyeOpen.svg";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import { Header } from "../../widgets/Header/Header";
import { SignSwiper } from "../../widgets/SignSwiper/SignSwiper";
import styles from "./SignUp.module.css";
import { SuccessRegistrationModal } from "./SuccessRegistrationModal/SuccessRegistrationModal";

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationData>();

  const { loading, success, error, errorMessage, registration, clearMessage } = useUserStore();

  const [isAgree, setIsAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, [clearMessage]);

  const onSubmit: SubmitHandler<RegistrationData> = (data) => registration(data, reset);

  return (
    <div className={styles.container}>
      <Header title="Sign Up" />

      <div className={styles.content}>
        <SignSwiper />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <span className={styles.formTitle}>Sign Up</span>

            <div className={styles.inputContainer}>
              <label className={`${errors.name && styles.labelError} ${styles.label}`}>Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 256,
                    message: "Name must be at most 256 characters long",
                  },
                })}
                placeholder="Your Name"
                className={`${errors.name && styles.inputError} ${styles.input}`}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
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

            <div className={styles.inputContainer}>
              <label className={`${errors.email && styles.labelError} ${styles.label}`}>
                Phone number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  validate: {
                    isPhone: (value) =>
                      /^(\+\d{1,3}[- ]?)?(\(?\d{1,4}\)?[- ]?)?\d{1,4}[- ]?\d{4}$/.test(value) ||
                      "Invalid phone number",
                  },
                })}
                placeholder="Your Phone Number"
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

            <div className={styles.checkboxContainer}>
              <div className={styles.wrapper}>
                <Checkbox
                  checked={isAgree}
                  value="agree"
                  sx={{
                    "& .MuiCheckbox-checkbox": {
                      backgroundColor: "var(--purple-600)",
                    },
                    "& .MuiCheckbox-checkbox:hover": {
                      backgroundColor: "var(--purple-600)",
                    },
                    "& .MuiCheckbox-icon": {
                      color: "var(--white)",
                    },
                  }}
                  size="lg"
                  variant="solid"
                  onChange={() => setIsAgree(!isAgree)}
                />
                <label className={styles.label}>I agree to the processing of personal data</label>
              </div>
            </div>

            <BaseButton disabled={loading || !isAgree} type="submit">
              Sign Up
            </BaseButton>

            <div className={styles.status}>
              {error && <p className={styles.error}>{errorMessage}</p>}
            </div>

            <div className={styles.text}>
              Already have an account?{" "}
              <Link to="/signin" className={styles.link}>
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>

      <SuccessRegistrationModal open={success} close={clearMessage} />
    </div>
  );
}
