package com.basis.teste.model.Endereco;

public record DadosNovoEnderecoDTO (
    String endereco,
    Integer numero,
    String bairro,
    String complemento,
    String cidade,
    String cep,
    String uf,
    Integer tipoEndereco
)
{}
