import { PlusIcon } from "../../../shared/assets/icons/PlusIcon";
import { useStore } from "../../../store/store";
import styles from "./Votings.module.css";

const AddVotingsBtn = () => {
  const { toggleModal } = useStore();

  return (
    <button type="button" className={styles.addButton} onClick={toggleModal}>
      <PlusIcon />
    </button>
  );
};

export default AddVotingsBtn;
