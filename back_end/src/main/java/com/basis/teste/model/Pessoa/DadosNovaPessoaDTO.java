package com.basis.teste.model.Pessoa;

import com.basis.teste.model.Endereco.DadosNovoEnderecoDTO;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

public record DadosNovaPessoaDTO(

        String ddd,

        String telefone,

        String email,

        Integer tipoPessoa,

        String cnpj,

        String cpf,

        String nome,

        String razaoSocial,

        List<DadosNovoEnderecoDTO> dadosNovoEndereco




) {

}
