import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { TIPO_PESSOA } from "../../constants";


type Props = {
  tipoPessoa: (typeof TIPO_PESSOA)[0];
  setTipoPessoa: (tipoPessoa: (typeof TIPO_PESSOA)[0]) => void;
};
export default function TipoPessoaComboBox(props: Props) {
  const { tipoPessoa, setTipoPessoa } = props;

  return (
    <Autocomplete
      options={TIPO_PESSOA}
      value={tipoPessoa}
      onChange={(event, value) => {
        if (value) setTipoPessoa(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Tipo de pessoa*" />
      )}
    />
  );
}
