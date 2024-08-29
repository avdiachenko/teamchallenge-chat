import { SubmitHandler, useForm } from "react-hook-form";
import { Header } from "../../widgets/Header/Header";
import styles from "./SignUp.module.css";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  residential_complex: string;
  apartment: string;
  entrance: string;
}

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

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
              placeholder="Username"
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
              type="text"
              {...register("apartment", { required: "Apartment is required" })}
              placeholder="Apartment"
              className={styles.input}
            />
            {errors.apartment && <p className={styles.error}>{errors.apartment.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              {...register("entrance", { required: "Entrance is required" })}
              placeholder="Entrance"
              className={styles.input}
            />
            {errors.entrance && <p className={styles.error}>{errors.entrance.message}</p>}
          </div>

          <input type="submit" value="Sign Up" className={styles.submit} />
        </form>
      </div>
    </div>
  );
}
