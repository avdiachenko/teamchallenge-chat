import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./BaseButton.module.css";

type VariantTypes = "primary" | "secondary" | "tertiary" | "quaternary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: (e: React.MouseEvent) => void;
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
