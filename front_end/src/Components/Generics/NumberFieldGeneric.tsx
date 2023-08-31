
import { TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";

type Variant = "outlined" | "standard" | "filled" | undefined;

type Props = {
  value: number | string;
  onChange: (valor: number) => void;
  label: string;
  maxLength?: number;
  submit?: () => void;
  type?: "money" | "number" | 'cep';
  prefix?: string;
  suffix?: string;
  mask?: string;
  variant?: Variant;
  textAlign?: "center" | "left" | "right";
  autoSelect?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  autoFocus?: boolean;
};

const NumberField: React.FC<Props> = (props) => {
  const {
    value,
    maxLength,
    submit,
    type,
    onChange,
    prefix,
    suffix,
    variant,
    textAlign,
    autoSelect,
    label,
    disabled,
    ...other
  } = props;

  let newVariant: Variant = variant;
  if (!newVariant) {
    newVariant = "outlined";
  } else if (newVariant === "standard") {
    newVariant = undefined;
  }


  let newValue = value;
  if (typeof value !== "string" && typeof value !== "number") {
    newValue = 0;
  }
  if (typeof newValue === "string") {
    newValue = parseFloat(newValue);
    if (!newValue) {
      newValue = 0;
    }
  }

  return (
    <NumericFormat
      prefix={type === "money" ? "R$ " : prefix}
      suffix={suffix}
      decimalSeparator={","}
      thousandSeparator={"."}
      fixedDecimalScale={type === "money" ? true : false}
      value={newValue}
      variant={newVariant}
      label={label}
      
      customInput={TextField}
      inputProps={{
        // type: 'number',
        maxLength,
        style: {
          textAlign
        }
      }}
      disabled={disabled}
      onFocus={(e) => {
        if (autoSelect) {
          if (suffix === undefined) {
            e.target.select();
          } else {
            setTimeout(() => {
              e.target.select();
            }, 200);
          }
        }
      }}
      onValueChange={(value) => {
        if (!value.floatValue) {
          value.floatValue = 0;
        }
        onChange(value.floatValue);
      }}
    />
  );
};
// const useStyles = makeStyles({});

export default NumberField;
