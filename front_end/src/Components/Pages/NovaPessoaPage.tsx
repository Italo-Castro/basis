import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TipoPessoaComboBox from "../Generics/TipoPessoaComboBox";
import TextFieldGeneric from "../Generics/TextFieldGeneric";
import { TIPO_PESSOA } from "../../constants";
import { Endereco } from "../Model/Endereco";
import RoofingIcon from "@mui/icons-material/Roofing";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import { Pessoa } from "../Model/Pessoa";
import ModalNovoEndereco from "./Modais/ModalNovoEndereco";
import ModalGeneric from "../Generics/ModalGeneric";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pessoaApi from "../../api/pessoaApi";

const NovaPessoaPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pessoaSelecionada = (state?.pessoaSelecionada as Pessoa) || null;

  const [tipoPessoa, setTipoPessoa] = useState<(typeof TIPO_PESSOA)[0]>(
    TIPO_PESSOA[0]
  );

  const [pessoa, setPessoa] = useState<Pessoa>(new Pessoa());

  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [openModalEndereco, setOpenModalEndereco] = useState(false);
  const [openModalExluir, setOpenModalExluir] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] =
    useState<Endereco | null>(null);

  useEffect(() => {
    if (!pessoaSelecionada) return;
    buscarPessoa();
  }, [pessoaSelecionada]);

  const buscarPessoa = async () => {
    try {
      const res = await pessoaApi.getByID(pessoaSelecionada.id);

      setPessoa(res);
      setEnderecos(res?.enderecos ?? []);
      
      if (res.tipoPessoa.toString() === 'PESSOA_FISICA') {
        setTipoPessoa(TIPO_PESSOA[0]); 
      } else {
        setTipoPessoa(TIPO_PESSOA[1]);
      }
    } catch (erro: any) {
      toast.error("Erro ao buscar informações da pessoa selecionada");
      console.log('error', erro)
    }
  };

  const colunas: GridColDef<Endereco>[] = [
    {
      field: "tipoEndereco",
      headerName: "",
      width: 50,
      editable: false,
      renderCell: (params) => {
        if (params.value === 0) {
          return <RoofingIcon />;
        } else if (params.value === 1) {
          return <BusinessIcon />;
        }
      },
    },
    {
      field: " ",
      headerName: "",
      width: 380,
      editable: false,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.row.numero} {""} {params.row.endereco} - {params.row.bairro}
            , {params.row.uf} / {params.row.cep}
          </div>
        );
      },
    },

    {
      field: "acoes",
      headerName: "",
      width: 50,
      editable: false,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => {
                setEnderecoSelecionado(params.row);
                setOpenModalExluir(true);
              }}
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const salvar = async () => {
    try {

      if (tipoPessoa.codigo === 0) {
        if (!pessoa.nome || pessoa.nome === '') {
            toast.error('Informe o nome da pessoa');
            return;
        }
      }else if (tipoPessoa.codigo === 1 && !pessoa.razaoSocial || pessoa.razaoSocial === '') {
        toast.error('Informe a razão social');
        return;
      }

      if (!pessoa.ddd) {
        toast.error('Informe o DD');
        return;
      }

      if (!pessoa.telefone) {
        toast.error('Informe o telefone');
        return;
      }

      if (pessoa.id) {
        await pessoaApi.update({
          id: pessoa.id,
          nome: pessoa.nome,
          cnpj: pessoa.cnpj,
          cpf: pessoa.cpf,
          ddd: pessoa.ddd,
          email: pessoa.email,
          razaoSocial: pessoa.razaoSocial,
          telefone: pessoa.telefone,
          tipoPessoa: tipoPessoa.codigo,
          dadosNovoEndereco: enderecos,
        });
      }

      await pessoaApi.insert({
        nome: pessoa.nome,
        cnpj: pessoa.cnpj,
        cpf: pessoa.cpf,
        ddd: pessoa.ddd,
        email: pessoa.email,
        razaoSocial: pessoa.razaoSocial,
        telefone: pessoa.telefone,
        tipoPessoa: tipoPessoa.codigo,
        dadosNovoEndereco: enderecos,
      });
      toast.success("Pessoa cadastrada");
      navigate("/");
    } catch (errp: any) {
      toast.error("Ocorreu um erro ao salvar a pessoa");
    }
  };

  return (
    <Grid
      spacing={2}
      container
      item
      xs={12}
      style={{ marginTop: "5%", display: "flex" }}
    >
      <Grid item xs={12}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>

      <Grid item xs={4}>
        <TipoPessoaComboBox
          tipoPessoa={tipoPessoa}
          setTipoPessoa={(value) => {
            setTipoPessoa(value);
            if (tipoPessoa.codigo === 0) {
              // setPessoa({ ...pessoa, razaoSocial: "", cnpj: "" });
            } else if (tipoPessoa.codigo === 1) {
              // setPessoa({ ...pessoa, nome: "", cpf: "" });
            }
          }}
        />
      </Grid>

      {tipoPessoa.codigo === 0 && (
        <>
          <Grid item xs={4}>
            <TextFieldGeneric
              label={"Nome"}
              value={pessoa.nome}
              onChange={(value) => {
                setPessoa({ ...pessoa, nome: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextFieldGeneric
              label={"CPF"}
              value={pessoa.cpf}
              onChange={(value) => {
                let cpfFormatado = value.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  "$1.$2.$3-$4"
                );
                setPessoa({ ...pessoa, cpf: cpfFormatado });
              }}
            />
          </Grid>
        </>
      )}

      {tipoPessoa.codigo === 1 && (
        <>
          <Grid item xs={4}>
            <TextFieldGeneric
              label={"Razão Social"}
              value={pessoa.razaoSocial}
              onChange={(value) => {
                setPessoa({ ...pessoa, razaoSocial: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextFieldGeneric
              label={"CNPJ"}
              value={pessoa.cnpj}
              onChange={(value) => {
                value = value.replace(/^(\d{2})(\d)/, "$1.$2");
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
                value = value.replace(/(\d{4})(\d)/, "$1-$2");
                setPessoa({ ...pessoa, cnpj: value });
              }}
            />
          </Grid>
        </>
      )}

      <Grid item xs={1}>
        <TextFieldGeneric
          label={"DDD*"}
          value={pessoa.ddd}
          onChange={(value) => {
            setPessoa({ ...pessoa, ddd: value });
          }}
        />
      </Grid>

      <Grid item xs={2}>
        <TextFieldGeneric
          label={"Telefone*"}
          value={pessoa.telefone}
          onChange={(value) => {
            setPessoa({ ...pessoa, telefone: value });
          }}
        />
      </Grid>

      <Grid item xs={9}>
        <TextFieldGeneric
          label={"Email"}
          value={pessoa.email}
          onChange={(value) => {
            setPessoa({ ...pessoa, email: value });
          }}
        />
      </Grid>

      <Grid container xs={6} style={{ margin: "15px 0px 0px 15px" }}>
        <Grid item xs={3.5}>
          <span> Endereços </span>
        </Grid>

        <Grid item xs={8}>
          <Button
            children={"Adicionar Endereco"}
            variant="contained"
            onClick={() => {
              setOpenModalEndereco(true);
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={4}></Grid>

      <Grid item xs={4}>
        <DataGrid
          columns={colunas}
          getRowId={(row) => row.id}
          disableColumnFilter
          hideFooter
          autoHeight
          rows={enderecos}
        />
      </Grid>

      <Grid item xs={12} style={{ display: "flex", justifyItems: "right" }}>
        <Button
          children={"Salvar"}
          variant="contained"
          onClick={() => {
            salvar();
          }}
        />
      </Grid>

      {openModalEndereco && (
        <ModalNovoEndereco
          open={openModalEndereco}
          onClose={() => setOpenModalEndereco(false)}
          adicionarEndereco={(value) => {
            setEnderecos([
              ...enderecos,
              { ...value, id: enderecos.length + 1 },
            ]);
            setOpenModalEndereco(false);
          }}
        />
      )}

      {openModalExluir && (
        <ModalGeneric
          open={openModalExluir}
          onClose={() => setOpenModalExluir(false)}
        >
          <Grid
            spacing={2}
            container
            item
            xs={12}
            style={{ textAlign: "center" }}
          >
            <Grid item xs={12}>
              <Typography> Deseja realmente excluir este endereço ?</Typography>
            </Grid>

            <Grid item xs={12}>
              <span> essa ação é irreversível </span>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setEnderecos([
                    ...enderecos.filter(
                      (item) => item.id !== enderecoSelecionado?.id
                    ),
                  ]);
                  setOpenModalExluir(false);
                }}
              >
                Remover
              </Button>
            </Grid>
          </Grid>
        </ModalGeneric>
      )}
    </Grid>
  );
};
export default NovaPessoaPage;
