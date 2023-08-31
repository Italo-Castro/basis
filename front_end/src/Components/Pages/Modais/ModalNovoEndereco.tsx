import { Button, Grid, IconButton, InputAdornment } from "@mui/material";
import { Endereco } from "../../Model/Endereco";
import ModalGeneric from "../../Generics/ModalGeneric";
import { useState } from "react";
import TextFieldGeneric from "../../Generics/TextFieldGeneric";
import buscaCepApi from "../../../api/buscaCepApi";
import TipoEnderecoComboBox from "../../Generics/TipoEnderecoComboBox";
import { TIPO_ENDERECO } from "../../../constants";
import { toast } from "react-toastify";
import NumberFieldGeneric from "../../Generics/NumberFieldGeneric";

type Props = {
  open: boolean;
  onClose: () => void;
  adicionarEndereco: (endereco: Endereco) => void;
};

const ModalNovoEndereco: React.FC<Props> = (props: Props) => {
  const { open, onClose, adicionarEndereco } = props;

  const [endereco, setEndereco] = useState<Endereco>(new Endereco());
  const [tipoEndereco, setTipoEndereco] = useState<(typeof TIPO_ENDERECO)[0]>(
    TIPO_ENDERECO[0]
  );

  const salvar = () => {
    if (!endereco.tipoEndereco) {
      setEndereco({ ...endereco, tipoEndereco: 0 });
    }

    if (!endereco.endereco) {
      toast.error("Por favor informe o endereço!");
      return;
    }

    if (!endereco.bairro) {
      toast.error("Por favor informe o bairro!");
      return;
    }

    if (!endereco.cep) {
      toast.error("Favor informar o CEP");
      return;
    }

    if (!endereco.cidade) {
      toast.error("Favor informar a cidade");
      return;
    }

    if (!endereco.uf) {
      toast.error("Favor informar a UF");
      return;
    }

    setEndereco({ ...endereco });
    adicionarEndereco(endereco);
  };

  const buscarCep = async () => {
    try {
      const res = await buscaCepApi.buscaCep("35570280");
      setEndereco({
        ...endereco,
        bairro: res.district,
        cidade: res.city,
        uf: res.state,
        endereco: res.address,
      });
    } catch (erro: any) {
      console.log("Erro ao buscar CEP", erro);
    }
  };

  return (
    <ModalGeneric open={open} onClose={onClose}>
      <Grid
        spacing={2}
        container
        item
        xs={12}
        style={{ marginTop: "5%", display: "flex" }}
      >
        <Grid item xs={12}>
          <h2>Inserir novo endereço</h2>
        </Grid>

        <Grid item xs={12}>
          <TipoEnderecoComboBox
            tipoEndereco={tipoEndereco}
            setTipoEndereco={(value) => {
              setTipoEndereco(value);
              setEndereco({ ...endereco, tipoEndereco: tipoEndereco.codigo });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <NumberFieldGeneric
            label={"CEP"}
            type="cep"
            maxLength={10}
            mask="#####-###"
            value={endereco.cep}
            onChange={(value) => {
              if (value.toString().length >= 8) {
                buscarCep();
              }
              setEndereco({ ...endereco, cep: value });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextFieldGeneric
            label={"Endereço"}
            value={endereco.endereco}
            onChange={(value) => {
              setEndereco({ ...endereco, endereco: value });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <NumberFieldGeneric
            label={"Numero"}
            type={"number"}
            value={endereco.numero}
            onChange={(value) => {
              console.log("yyyy", value);
              setEndereco({ ...endereco, numero: value });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextFieldGeneric
            label={"Complemento"}
            value={endereco.complemento}
            onChange={(value) => {
              setEndereco({ ...endereco, complemento: value });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextFieldGeneric
            label={"Bairro"}
            value={endereco.bairro}
            onChange={(value) => {
              setEndereco({ ...endereco, bairro: value });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextFieldGeneric
            label={"Cidade"}
            value={endereco.cidade}
            onChange={(value) => {
              setEndereco({ ...endereco, cidade: value });
            }}
          />
        </Grid>

        <Grid item xs={2}>
          <TextFieldGeneric
            label={"UF"}
            maxLength={2}
            value={endereco.uf}
            onChange={(value) => {
              setEndereco({ ...endereco, uf: value });
            }}
          />
        </Grid>

        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              salvar();
            }}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </ModalGeneric>
  );
};
export default ModalNovoEndereco;
