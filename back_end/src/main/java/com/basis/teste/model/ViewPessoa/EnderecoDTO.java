package com.basis.teste.model.ViewPessoa;

import com.basis.teste.model.Endereco.Endereco;

public record EnderecoDTO(String endereco, Integer numero, String bairro, String complemento, String cidade, String cep, String uf) {


    public EnderecoDTO(Endereco endereco) {
        this(
                endereco.getEndereco(),
                endereco.getNumero(),
                endereco.getBairro(),
                endereco.getComplemento(),
                endereco.getCidade(),
                endereco.getCep(),
                endereco.getUf()
        );
    }
}
