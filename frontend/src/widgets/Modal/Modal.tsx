import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
const ModalContainer = () => {
  return (
    <Modal open>
      <ModalDialog>
        <ModalClose />
        <Typography>Modal title</Typography>
      </ModalDialog>
    </Modal>
  );
};

export default ModalContainer;
