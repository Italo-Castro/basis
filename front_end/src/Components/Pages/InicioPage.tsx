import { Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import TextFieldGeneric from "../Generics/TextFieldGeneric";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pessoaApi from "../../api/pessoaApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { Pessoa } from "../Model/Pessoa";
import { PessoaVW } from "../Model/PessoaVW";
import ModalGeneric from "../Generics/ModalGeneric";

const InicioPage: React.FC = () => {
  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  const [pessoas, setPessoas] = useState<PessoaVW[]>([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(null);
  const [openModalExcluir, setOpenModalExcluir] = useState(false);

  useEffect(() => {
    buscarPessoas();
  }, []);

  const buscarPessoas = async () => {
    try {
      console.log('yyyy',nome)
      if (nome && nome !== '') {
        const res = await pessoaApi.getPessoasByName(nome);
        setPessoas(res);
        return;
      }
      const res = await pessoaApi.getPessoas();
      setPessoas(res);
    } catch (erro: any) {
      toast.error("Erro ao buscar usuários");
    }
  };

  const excluir = async () => {
    try {

      if (!pessoaSelecionada) return;

      await pessoaApi.excluir(pessoaSelecionada.id);
      setOpenModalExcluir(false);
      setPessoaSelecionada(null)

      await buscarPessoas();
      toast.info('Usuário deletado!');
    }catch(erro:any){
      toast.error("Erro ao excluir Usuário");
    }
  }

  const colunas: GridColDef[] = [
    {
      field: "nome",
      headerName: "Nome",
      width: 280,
      editable: false,
    },
    {
      field: "documento",
      headerName: "CPF/CNPJ",
      width: 230,
      editable: false,
    },
    {
      field: "contato",
      headerName: "Telefone",
      width: 230,
      editable: false,
    },
    {
      field: "enderecoResidencial",
      headerName: "Endereços Residencias",
      width: 300,
      editable: false,
    },
    {
      field: "enderecoComercial",
      headerName: "Endereços Comerciais",
      width: 300,
      editable: false,
    },

    {
      field: "acoes",
      headerName: "",
      width: 200,
      editable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value}
          <Button
            style={{ margin: "5px" }}
            variant="contained"
            onClick={() => {
              navigate(`/novaPessoa/`, {
                state: { pessoaSelecionada: params.row }
              });
            }}
          >
            Editar
          </Button>

          <Button
            style={{ margin: "5px" }}
            variant="contained"
            onClick={() => {
              setPessoaSelecionada(params.row)
              setOpenModalExcluir(true);
            }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Grid container item xs={12} style={{ marginTop: "5%", display: "flex" }}>
      <Grid item xs={3}>
        <TextFieldGeneric
          label="Pesquisa por nome"
          value={nome}
          onChange={(value) => {
            setNome(value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => buscarPessoas()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={3}>
        <Button
          onClick={() => {
            buscarPessoas();
          }}
          children={"Pesquisar"}
          variant="outlined"
          style={{ marginLeft: "15px" }}
        />
      </Grid>

      <Grid item xs={3}></Grid>

      <Grid item xs={3}>
        <Button
          children={"Novo usuário"}
          variant="contained"
          style={{ marginLeft: "15px" }}
          onClick={() => {
            navigate(`novaPessoa`);
          }}
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: "1.5rem" }}>
        <DataGrid
          disableColumnFilter
          hideFooter
          columns={colunas}
          rows={pessoas}
          style={{ width: "1550px" }}
        />
      </Grid>

      {openModalExcluir && (
        <ModalGeneric
          open={openModalExcluir}
          onClose={() => setOpenModalExcluir(false)}
        >
          <Grid
            spacing={2}
            container
            item
            xs={12}
            style={{ textAlign: "center" }}
          >
            <Grid item xs={12}>
              <Typography> Deseja realmente excluir este usuário ?</Typography>
            </Grid>

            <Grid item xs={12}>
              <span> essa ação é irreversível </span>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  excluir();
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
export default InicioPage;
