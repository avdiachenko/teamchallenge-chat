import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { RegistrationData } from "../../entities/user/user.types";
import { SignSwiper } from "../../shared/components/SignSwiper/SignSwiper";
import { Header } from "../../widgets/Header/Header";
import styles from "./SignUp.module.css";

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationData>();

  const { name, regLoading, regSuccess, regError, regErrorMessage, registration, clearMessage } =
    useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (name) navigate("/chat", { replace: true });
  }, [name, navigate]);

  useEffect(() => clearMessage(), [clearMessage]);

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => registration(data, reset);

  return (
    <div className={styles.container}>
      <Header title="Sign Up" />

      <div className={styles.content}>
        <SignSwiper />

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <span className={styles.formTitle}>Sign Up</span>

            <div className={styles.inputContainer}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
                placeholder="Your Name"
                className={styles.input}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>

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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                placeholder="Your Password"
                className={styles.input}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>Residential Complex</label>
              <input
                type="text"
                {...register("residential_complex", {
                  required: "Residential complex is required",
                })}
                placeholder="Your Residential Complex"
                className={styles.input}
              />
              {errors.residential_complex && (
                <p className={styles.error}>{errors.residential_complex.message}</p>
              )}
            </div>

            <div className={styles.wrapper}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Apartment</label>
                <input
                  type="number"
                  {...register("apartment", {
                    required: "Apartment is required",
                  })}
                  placeholder="Number"
                  className={styles.input}
                />
                {errors.apartment && <p className={styles.error}>{errors.apartment.message}</p>}
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.label}>Entrance</label>
                <input
                  type="number"
                  {...register("entrance", { required: "Entrance is required" })}
                  placeholder="Number"
                  className={styles.input}
                />
                {errors.entrance && <p className={styles.error}>{errors.entrance.message}</p>}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.wrapper}>
                <input
                  type="checkbox"
                  {...register("agree", { required: "Agree is required" })}
                  className={styles.checkbox}
                />
                <label className={styles.label}>
                  Agree to receive advertisements and promotions
                </label>
              </div>
              {errors.agree && <p className={styles.error}>{errors.agree.message}</p>}
            </div>

            <input type="submit" value="Sign Up" disabled={regLoading} className={styles.submit} />

            <div className={styles.status}>
              {regLoading && <p className={styles.request}>Registration request</p>}
              {regError && <p className={styles.error}>{regErrorMessage}</p>}
              {regSuccess && <p className={styles.success}>Registration success</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
