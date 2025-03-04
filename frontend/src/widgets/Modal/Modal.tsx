import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";
interface ModalContainerProps {
  toggleModal: () => void;
  isModal: boolean;
  children: React.ReactNode;
}
const ModalContainer = ({ toggleModal, isModal, children }: ModalContainerProps) => {
  return (
    <Modal open={isModal} onClose={toggleModal}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Title</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalContainer;
