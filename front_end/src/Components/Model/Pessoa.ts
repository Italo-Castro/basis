import { Endereco } from "./Endereco";

export class Pessoa {
  id!: number;
  nome!: string;
  razaoSocial!: string;
  ddd!: string;
  telefone!: string;
  email!: string;
  tipoPessoa!: number;
  cpf!: string;
  cnpj!: string;
  enderecos?: Endereco[];
}
