import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
const ModalContainer = ({
  toggleModal,
  isModal,
}: {
  toggleModal: () => void;
  isModal: boolean;
}) => {
  return (
    <Modal open={isModal} onClose={toggleModal}>
      <ModalDialog>
        <ModalClose />
        <Typography>Modal title</Typography>
      </ModalDialog>
    </Modal>
  );
};

export default ModalContainer;
