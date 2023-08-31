import { Pessoa } from "../Components/Model/Pessoa";
import { PessoaResumido } from "../Components/Model/PessoaResumido";
import { PessoaVW } from "../Components/Model/PessoaVW";
import { PessoaDTO } from "../Components/Model/Types/TypePessoa";
import api from "./api";

const ROUTE = "pessoa";

class pessoaApi {
  async getPessoas() {
    try {
      const res = await api.get<PessoaVW[]>(`/${ROUTE}`);
      const data = res.data;

      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async getPessoasByName(nome: string) {
    try {
      const res = await api.get<PessoaVW[]>(`/${ROUTE}/findByNome/${nome}`);
      const data = res.data;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async getByID(id: number) {
    try {
      const res = await api.get<Pessoa>(`/${ROUTE}/${id}`);
      const data = res.data;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async insert(dados: PessoaDTO) {
    try {
      const res = await api.post<any>(`/${ROUTE}`, dados);
      const data = res.data.content;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async excluir(id: number) {
    try {
      const res = await api.delete<boolean>(`/${ROUTE}/${id}`);
      const data = res.data;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async update(dados: PessoaDTO) {
    try {
      const res = await api.put<boolean>(`/${ROUTE}`, dados);
      const data = res.data;
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}

export default new pessoaApi();
