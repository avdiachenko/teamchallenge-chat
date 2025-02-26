import { useEffect } from "react";
import { useUserStore } from "../entities/user/user.store";
import ModalContainer from "../widgets/Modal/Modal";
import { useStore } from "../store/store";

interface Props {
  children: JSX.Element;
}

export function App(props: Props) {
  const { children } = props;
  const { isInitialized, initialization } = useUserStore();
  const { isModal, toggleModal } = useStore();
  useEffect(() => {
    if (!isInitialized) initialization();
  }, [isInitialized, initialization]);

  return (
    <>
      {children}
     <ModalContainer isModal={isModal} toggleModal={toggleModal} />
    </>
  );
}
