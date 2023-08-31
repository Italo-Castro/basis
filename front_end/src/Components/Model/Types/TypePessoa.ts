import { Endereco } from "../Endereco";

export type PessoaDTO = {
  id?: number;
  nome: string;
  razaoSocial: string;
  ddd: string;
  telefone: string;
  email: string;
  tipoPessoa: number;
  cpf: string;
  cnpj: string;

  dadosNovoEndereco: Endereco[];
};
