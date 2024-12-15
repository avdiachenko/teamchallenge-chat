import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./BaseButton.module.scss";

type VariantTypes = "primary" | "outlined" | "text" | "light";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  variant?: VariantTypes;
}

export function BaseButton(props: Props) {
  const { children, onClick, variant = "primary", ...otherProps } = props;

  return (
    <button onClick={onClick} className={`${styles.baseButton} ${styles[variant]}`} {...otherProps}>
      {children}
    </button>
  );
}
