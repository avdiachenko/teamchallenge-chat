import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { BASE_URL } from "../../shared/constants/urls";
import { Header } from "../../widgets/Header/Header";
import styles from "./SignUp.module.css";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  residential_complex: string;
  apartment: number;
  entrance: number;
  phone: string;
}

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const [regError, setRegError] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regRequest, setRegRequest] = useState(false);

  const { name } = useUserStore();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setRegError(false);
    setRegSuccess(false);
    setRegRequest(true);

    fetch(BASE_URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Registration failed");
        setRegSuccess(true);
        reset();
      })
      .catch(() => {
        setRegError(true);
      })
      .finally(() => {
        setRegRequest(false);
      });
  };

  if (name) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
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
              type="text"
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

          <input type="submit" value="Sign Up" disabled={regRequest} className={styles.submit} />
        </form>

        <div className={styles.status}>
          {regRequest && <p className={styles.request}>Registration request</p>}
          {regError && <p className={styles.error}>Registration error</p>}
          {regSuccess && <p className={styles.success}>Registration success</p>}
        </div>
      </div>
    </div>
  );
}
