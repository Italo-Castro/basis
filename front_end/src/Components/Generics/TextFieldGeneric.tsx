import { FilledInputProps, InputBaseComponentProps, InputProps, OutlinedInputProps, TextField } from "@mui/material";
import { CSSProperties, HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "outlined" | "standard" | "filled";
  type?: HTMLInputTypeAttribute;
  style?: CSSProperties;
  fullWidth?: boolean;
  minRows?: number;
  disabled?: boolean;
  InputProps?: Partial<OutlinedInputProps> | Partial<InputProps> | Partial<FilledInputProps> | undefined
  maxLength?: number;
};

const TextFieldGeneric: React.FC<Props> = (props) => {
  const {
    label,
    value,
    variant,
    type,
    onChange,
    style,
    fullWidth,
    minRows,
    disabled,
    InputProps,maxLength
  } = props;

  let newVariant = variant;
  if (!newVariant) {
    newVariant = "outlined";
  }

  return (
    <TextField
      id="standard-basic"
      label={label}
      variant={newVariant}
      value={value}
      multiline
      
      type={type}
      disabled={disabled}
      minRows={minRows ? minRows : 0}
      style={style}
      fullWidth={fullWidth === false ? false : true}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      inputProps={{
        // type: 'number',
        maxLength,
        
      }}
      InputProps={InputProps}
    />
  );
};

export default TextFieldGeneric;
