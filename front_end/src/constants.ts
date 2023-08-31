export const TIPO_PESSOA = [
  { label: "Pessoa Física", codigo: 0 },
  { label: "Pessoa Juridica", codigo: 1 },
];

export const TIPO_ENDERECO = [
  { label: "Endereço residencial", codigo: 0 },
  { label: "Endereço comercial", codigo: 1 },
];

export type ResBuscaCep = {
  address: string;
  city: string;
  code: string;
  district: string;
  ok: boolean;
  state: string;
  status: number;
  statusText: string;
};
