import { Modal, ModalClose, Sheet } from "@mui/joy";
import { useNavigate } from "@tanstack/react-router";

import { BaseButton } from "@/shared/components/BaseButton/BaseButton";

import regFolderImage from "./icons/regFolderImage.svg";
import styles from "./SuccessRegistrationModal.module.css";

interface Props {
  open: boolean;
  close: () => void;
}
export function SuccessRegistrationModal(props: Props) {
  const { open, close } = props;
  const navigate = useNavigate();

  const clickHomeButton = () => {
    close();
    navigate({ to: "/" });
  };

  if (!open) {
    return null;
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => close()}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          background: "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          p: 3,
          boxShadow: "lg",
          padding: "60px 90px",
          "@media screen and (max-width: 768px)": {
            padding: "30px 20px",
          },
        }}
      >
        <ModalClose
          variant="plain"
          sx={{
            m: 2,
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:active": {
              backgroundColor: "transparent",
            },
            "& .MuiSvgIcon-root": {
              fontSize: 30,
              color: "var(--purple-950)",
            },
          }}
        />
        <div className={styles.content}>
          <div className={styles.imageBox}>
            <img src={regFolderImage} alt="SuccessRegistrationModal" />
          </div>

          <div className={styles.title}>Your account has been created!</div>

          <div className={styles.text}>
            An administrator needs to approve your request. Once it's confirmed, you will receive a
            notification and be able to log in. Thank you for your patience!
          </div>

          <BaseButton type="button" onClick={clickHomeButton}>
            Sign Up
          </BaseButton>
        </div>
      </Sheet>
    </Modal>
  );
}
