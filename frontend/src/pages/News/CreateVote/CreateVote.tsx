import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, List, ListItem, Radio, RadioGroup } from "@mui/joy";
import { useState } from "react";

interface IFormInput {
  headline: string;
  votingType: { label: string; value: string };
  startDate: string;
  endDate: string;
  options: { [key: number]: string }[];
  displayType: string;
}
type OptionsType = Record<number, string>;
export const CreateVote = () => {
  const [options, setOptions] = useState(1);
  const { control, handleSubmit } = useForm<IFormInput & { options: OptionsType }>({
    defaultValues: {
      headline: "",
      votingType: { label: "", value: "" },
      startDate: new Date().toISOString().split("T")[0],
      endDate: "To",
      options: [],
      displayType: "",
    },
  });
  const handleOnSetOptions = () => {
    setOptions((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="headline" control={control} render={({ field }) => <Input {...field} />} />
      <Controller
        name="votingType"
        control={control}
        render={({ field }) => (
          <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
            <List
              sx={{
                minWidth: 240,
                "--List-gap": "0.5rem",
                "--ListItem-paddingY": "1rem",
                "--ListItem-radius": "8px",
                "--ListItemDecorator-size": "32px",
              }}
            >
              {[
                { label: "Several options", value: "Several" },
                { label: "One option", value: "Single" },
              ].map(({ label, value }) => (
                <ListItem variant="outlined" key={label} sx={{ boxShadow: "sm" }}>
                  <Radio
                    {...field}
                    overlay
                    value={value}
                    label={label}
                    sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                    slotProps={{
                      action: ({ checked }) => ({
                        sx: (theme) => ({
                          ...(checked && {
                            inset: -1,
                            border: "2px solid",
                            borderColor: theme.vars.palette.primary[500],
                          }),
                        }),
                      }),
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </RadioGroup>
        )}
      />
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => <Input {...field} type="date" placeholder="From" />}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field }) => <Input {...field} type="date" placeholder="To" />}
      />
      <h2>Answer options</h2>
      <div>
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
                    <Input key={index} {...field} value={field.value as string} />
                  )}
                />
              ))}
            </>
          )}
        />
        <h2>Choose the way to display voting results:</h2>

        <Controller
          name="displayType"
          control={control}
          render={({ field }) => (
            <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
              <List
                sx={{
                  minWidth: 240,
                  "--List-gap": "0.5rem",
                  "--ListItem-paddingY": "1rem",
                  "--ListItem-radius": "8px",
                  "--ListItemDecorator-size": "32px",
                }}
              >
                {[
                  { label: "Display as a percentage", value: "Percentage" },
                  { label: "Display the number of people who voted", value: "Number" },
                ].map(({ label, value }) => (
                  <ListItem variant="outlined" key={label} sx={{ boxShadow: "sm" }}>
                    <Radio
                      {...field}
                      overlay
                      value={value}
                      label={label}
                      sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              inset: -1,
                              border: "2px solid",
                              borderColor: theme.vars.palette.primary[500],
                            }),
                          }),
                        }),
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </RadioGroup>
          )}
        />

        <button type="button" onClick={handleOnSetOptions}>
          Add
        </button>
      </div>
      <input type="submit" />
    </form>
  );
};
