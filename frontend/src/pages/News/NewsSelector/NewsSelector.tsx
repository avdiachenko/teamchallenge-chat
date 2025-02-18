import {
  ResidentialComplex,
  ResidentialComplexDetails,
} from "../../../entities/residentialComplex/residentialComplex.types";
import { useUserStore } from "../../../entities/user/user.store";
import useApi from "../../../shared/api/useApi";
import styles from "./NewsSelector.module.css";

interface Props {
  selectedComplex: string | null;
  selectedSection: string | null;
  setSelectedComplex: (complex: string | null) => void;
  setSelectedSection: (section: string | null) => void;
}

export function NewsSelector(props: Props) {
  const { selectedComplex, selectedSection, setSelectedComplex, setSelectedSection } = props;
  const { user } = useUserStore();
  const residentialComplex = user?.buildings?.[0]?.residential_complex_id;
  const { data: complexes } = useApi<ResidentialComplex[]>(user?.is_admin ? "/complexes" : null);
  const { data: userComplex } = useApi<ResidentialComplexDetails>(
    !user?.is_admin ? `/complexes/${residentialComplex}` : null
  );
  console.log("userComplex", userComplex);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user?.is_admin &&
          complexes &&
          complexes.map((complex) => (
            <div
              className={`${styles.card} ${selectedComplex === complex.name && ` ${styles.selected}`}`}
              key={complex._id}
              onClick={() => setSelectedComplex(selectedComplex)}
            >
              <img src={complex.images[0]} alt={complex.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <span className={styles.cardTitle}>{complex.name}</span>
              </div>
            </div>
          ))}

        {/* {user?.is_admin && userComplex && (
          <>
            <div
              className={`${styles.card} ${selectedComplex === userComplex.name && ` ${styles.selected}`}`}
              onClick={() => {
                setSelectedSection(null);
                setSelectedComplex(userComplex.name);
              }}
            >
              <img src={userComplex.images[0]} alt={userComplex.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <span className={styles.cardTitle}>{userComplex.name}</span>
              </div>
            </div>

            {userComplex?.sectionNames.map((sectionName) => (
              <div
                className={`${styles.card} ${selectedSection === sectionName && ` ${styles.selected}`}`}
                key={sectionName}
                onClick={() => {
                  setSelectedComplex(null);
                  setSelectedSection(sectionName);
                }}
              >
                <img
                  src={userComplex.images[0]}
                  alt={userComplex.name}
                  className={styles.cardImg}
                />
                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>Section {sectionName}</span>
                </div>
              </div>
            ))}
          </>
        )} */}

        {!user?.is_admin && userComplex && (
          <>
            <div
              className={`${styles.card} ${selectedComplex === userComplex.name && ` ${styles.selected}`}`}
              onClick={() => {
                setSelectedSection(null);
                setSelectedComplex(userComplex._id);
              }}
            >
              <img src={userComplex.images[0]} alt={userComplex.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <span className={styles.cardTitle}>{userComplex.name}</span>
              </div>
            </div>

            <div
              className={`${styles.card} ${selectedSection === "section" && ` ${styles.selected}`}`}
              onClick={() => {
                setSelectedComplex(null);
                setSelectedSection("section");
              }}
            >
              <img src={userComplex.images[0]} alt={userComplex.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <span className={styles.cardTitle}>Your section</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
