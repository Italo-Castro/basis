import { ResBuscaCep } from "../constants";
import api from "./api";

class cepApi {
  async buscaCep(cep: string) {
    try {
      const res = await api.get<ResBuscaCep>(`viacep.com.br/ws/35570280/json/`);
      console.log(res);
      const data = res.data;

      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}

export default new cepApi();
