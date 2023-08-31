import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { TIPO_ENDERECO } from "../../constants";


type Props = {
  tipoEndereco: (typeof TIPO_ENDERECO)[0];
  setTipoEndereco: (tipoEndereco: (typeof TIPO_ENDERECO)[0]) => void;
};
export default function TipoEnderecoComboBox(props: Props) {
  const { tipoEndereco, setTipoEndereco } = props;

  return (
    <Autocomplete
      options={TIPO_ENDERECO}
      value={tipoEndereco}
      onChange={(event, value) => {
        if (value) setTipoEndereco(value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Tipo do endereço" />
      )}
    />
  );
}
