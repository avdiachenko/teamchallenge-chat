import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { RegistrationData } from "../../entities/user/user.types";
import signImage from "../../shared/assets/images/signImage.jpg";
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
        <img src={signImage} alt="logo" className={styles.logo} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              })}
              placeholder="Name"
              className={styles.input}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

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

          <div className={styles.inputContainer}>
            <input
              type="text"
              {...register("residential_complex", {
                required: "Residential complex is required",
              })}
              placeholder="Residential complex"
              className={styles.input}
            />
            {errors.residential_complex && (
              <p className={styles.error}>{errors.residential_complex.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="number"
              {...register("apartment", {
                required: "Apartment is required",
              })}
              placeholder="Apartment"
              className={styles.input}
            />
            {errors.apartment && <p className={styles.error}>{errors.apartment.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="number"
              {...register("entrance", { required: "Entrance is required" })}
              placeholder="Entrance"
              className={styles.input}
            />
            {errors.entrance && <p className={styles.error}>{errors.entrance.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="phone"
              {...register("phone")}
              placeholder="Phone"
              className={styles.input}
            />
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
  );
}
