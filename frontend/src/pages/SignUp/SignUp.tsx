import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Checkbox, Select } from "@mui/joy";
import Option from "@mui/joy/Option";
import { selectClasses } from "@mui/joy/Select";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { RegistrationData } from "../../entities/user/user.types";
import { api } from "../../shared/api/api";
import EyeClosed from "../../shared/assets/icons/EyeClosed.svg";
import EyeOpen from "../../shared/assets/icons/EyeOpen.svg";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import { SignSwiper } from "../../shared/components/SignSwiper/SignSwiper";
import { Header } from "../../widgets/Header/Header";
import { Complex } from "./Complex.type";
import styles from "./SignUp.module.css";
import { SuccessRegistrationModal } from "./SuccessRegistrationModal/SuccessRegistrationModal";

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<RegistrationData>();

  const [isAgree, setIsAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, success, error, errorMessage, registration, clearMessage } = useUserStore();

  const [complexes, setComplexes] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const data = await api("/api/residential_complex");
        setComplexes(data.map((complex: Complex) => complex.name));
      } catch (e) {
        console.error(e);
      }
    };

    fetchComplexes();
  }, []);

  useEffect(() => () => clearMessage(), [clearMessage]);

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

            <div className={styles.inputContainer}>
              <label
                className={`${errors.residential_complex && styles.labelError} ${styles.label}`}
              >
                Residential Complex
              </label>
              <Controller
                name="residential_complex"
                control={control}
                defaultValue=""
                rules={{ required: "Residential complex is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Your Residential Complex"
                    indicator={<KeyboardArrowDown />}
                    onChange={(_, newValue) => {
                      field.onChange(newValue);
                    }}
                    sx={{
                      width: "100%",
                      fontSize: "18px",
                      fontWeight: 400,
                      padding: "13px 20px",
                      color: "var(--gray-900)",
                      boxShadow: "none",
                      backgroundColor: "var(--white)",
                      border: errors.residential_complex ? "1px solid var(--error-500)" : "none",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "var(--white)",
                      },
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                    }}
                    slotProps={{
                      listbox: {
                        sx: {
                          maxHeight: 220,
                          overflow: "auto",
                          borderRadius: "5px",
                        },
                      },
                    }}
                  >
                    {complexes?.map((complex) => (
                      <Option key={complex} value={complex}>
                        {complex}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.residential_complex && (
                <p className={styles.error}>{errors.residential_complex.message}</p>
              )}
            </div>

            <div className={styles.wrapper}>
              <div className={styles.inputContainer}>
                <label className={`${errors.section && styles.labelError} ${styles.label}`}>
                  Section
                </label>
                <input
                  type="text"
                  {...register("section", {
                    required: "Section is required",
                    minLength: {
                      value: 1,
                      message: "Minimum 1 character",
                    },
                    maxLength: {
                      value: 5,
                      message: "Maximum 5 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Zа-яА-Я0-9]+$/,
                      message: "Only letters and numbers",
                    },
                  })}
                  placeholder="String"
                  className={`${errors.section && styles.inputError} ${styles.input}`}
                />
                {errors.section && <p className={styles.error}>{errors.section.message}</p>}
              </div>

              <div className={styles.inputContainer}>
                <label className={`${errors.entrance && styles.labelError} ${styles.label}`}>
                  Entrance
                </label>
                <input
                  type="number"
                  {...register("entrance", {
                    required: "Entrance is required",
                    min: {
                      value: 1,
                      message: "Must be at least 1",
                    },
                    max: {
                      value: 999,
                      message: "Must be 999 or less",
                    },
                  })}
                  placeholder="Number"
                  className={`${errors.entrance && styles.inputError} ${styles.input}`}
                />
                {errors.entrance && <p className={styles.error}>{errors.entrance.message}</p>}
              </div>

              <div className={styles.inputContainer}>
                <label className={`${errors.apartment && styles.labelError} ${styles.label}`}>
                  Apartment
                </label>
                <input
                  type="number"
                  {...register("apartment", {
                    required: "Apartment is required",
                    min: {
                      value: 1,
                      message: "Must be at least 1",
                    },
                    max: {
                      value: 9999,
                      message: "Must be 9999 or less",
                    },
                  })}
                  placeholder="Number"
                  className={`${errors.apartment && styles.inputError} ${styles.input}`}
                />
                {errors.apartment && <p className={styles.error}>{errors.apartment.message}</p>}
              </div>
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
                <label className={styles.label}>
                  Agree to receive advertisements and promotions
                </label>
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
