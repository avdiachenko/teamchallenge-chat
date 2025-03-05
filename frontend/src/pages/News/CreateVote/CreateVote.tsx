import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "@mui/joy";
import { useState } from "react";
import { api } from "../../../shared/api/api";
import styles from "./CreateVote.module.css";
import { PlusIcon } from "../../../shared/assets/icons/PlusIcon";
import { useStore } from "../../../store/store";

interface IFormInput {
  headline: string;
  votingType: { label: string; value: string };
  startDate: string;
  endDate: string;
  options: { [key: number]: string }[];
  displayType: { label: string; value: string };
  isAnonymous: boolean;
}
type OptionsType = Record<number, string>;
export const CreateVote = () => {
  const { toggleModal } = useStore();
  const [options, setOptions] = useState(1);
  const { control, handleSubmit } = useForm<IFormInput & { options: OptionsType }>({
    defaultValues: {
      headline: "",
      votingType: { label: "", value: "" },
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      options: [],
      displayType: { label: "", value: "" },
      isAnonymous: true,
    },
  });
  const handleOnSetOptions = () => {
    setOptions((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const preparedData = {
      ...data,
      options: data.options.map((option) => ({
        name: option,
      })),
    };
    try {
      await api("/votings/6760675f58e4cf9dc2be0bdb", {
        method: "POST",
        body: JSON.stringify(preparedData),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.containerTitle}>Create a vote</h1>
        <div className={styles.addOptionContainer}>
          <button type="button" onClick={toggleModal} className={styles.closeModal}>
            <div className={styles.icon}>
              <PlusIcon fillColor="#7D7CF3" />
            </div>
          </button>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Title</h2>
        <Controller
          name="headline"
          control={control}
          render={({ field }) => (
            <input type="text" {...field} value={field.value ?? ""} className={styles.input} />
          )}
        />
        <h2 className={styles.title}>Voting options</h2>
        <Controller
          name="votingType"
          control={control}
          render={({ field }) => (
            <div className={styles.radioContainer}>
              {[
                { label: "Several options", value: "Multiple" },
                { label: "One option", value: "Single" },
              ].map(({ label, value }) => (
                <div key={label} className={styles.radio}>
                  <label className={styles.label}>
                    {label}

                    <input
                      type="radio"
                      className={styles.visuallyHidden}
                      {...field}
                      value={value}
                      checked={field.value.value === value}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        />
        <h2 className={styles.title}>Answer options</h2>

        <Controller
          name="options"
          control={control}
          render={() => (
            <>
              {[...Array(options).keys()].map((_, index) => (
                <Controller
                  name={`options.${index}`}
                  control={control}
                  key={index}
                  render={({ field }) => (
                    <input
                      type="text"
                      key={index}
                      {...field}
                      value={(field.value as string) ?? ""}
                      className={styles.input}
                    />
                  )}
                />
              ))}
            </>
          )}
        />
        <div className={styles.addOptionContainer}>
          <button type="button" onClick={handleOnSetOptions} className={styles.addOption}>
            <div className={styles.icon}>
              <PlusIcon fillColor="#7D7CF3" />
            </div>
            <div>Add</div>
          </button>
        </div>

        <div className={styles.dateTitle}>
          <h2 className={styles.title}>Choose the period of voting</h2>
          <h3 className={styles.subtitle}>
            Voting will be opened after verification and approval by the administrator.
          </h3>
        </div>
        <div className={styles.dateContainer}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Input {...field} type="date" placeholder="From" className={styles.date} />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Input {...field} type="date" placeholder="To" className={styles.date} />
            )}
          />
        </div>
        <h2 className={styles.title}>Choose the way to display voting results:</h2>

        <Controller
          name="displayType"
          control={control}
          render={({ field }) => (
            <div className={styles.displayContainer}>
              {[
                { label: "Display as a percentage", value: "Percentages" },
                { label: "Display the number of people who voted", value: "Number" },
              ].map(({ label, value }) => (
                <div key={label} className={styles.radioDisplay}>
                  <label className={styles.label}>
                    {label}
                    <input
                      type="radio"
                      {...field}
                      value={value}
                      className={styles.visuallyHidden}
                      checked={field.value.value === value}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        />
        <Controller
          name="isAnonymous"
          control={control}
          render={({ field }) => (
            <div className={styles.displayContainer}>
              <div className={styles.radioDisplay}>
                <label className={styles.label}>
                  Make voting anonymous
                  <input
                    type="checkbox"
                    {...field}
                    value={field.value ? "true" : "false"}
                    className={styles.visuallyHidden}
                  />
                </label>
              </div>
            </div>
          )}
        />

        <input type="submit" className={styles.submit} />
      </form>{" "}
    </div>
  );
};
