import { useNavigate } from "@tanstack/react-router";

import { BaseButton } from "@/shared/components/BaseButton/BaseButton";

import styles from "./ErrorPage.module.css";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span className={styles.text}>Oops! Something went wrong.</span>
      <div>
        <BaseButton variant="primary" onClick={() => navigate({ to: "/" })}>
          Back to Home
        </BaseButton>
      </div>
    </div>
  );
}
