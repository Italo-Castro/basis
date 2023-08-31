package com.basis.teste.model.ViewPessoa;

import com.basis.teste.model.Endereco.Endereco;

public class ListaPessoaDTO{
        int id;

        String email;

        String contato;

        String tipoPessoa;

        String nome;

        String documento;

        String enderecoComercial;

        String enderecoResidencial;

    public ListaPessoaDTO(int id, String email, String contato, String tipoPessoa, String nome, String documento, String enderecoComercial, String enderecoResidencial) {
        this.id = id;
        this.email = email;
        this.contato = contato;
        this.tipoPessoa = tipoPessoa;
        this.nome = nome;
        this.documento = documento;
        this.enderecoComercial = enderecoComercial;
        this.enderecoResidencial = enderecoResidencial;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getTipoPessoa() {
        return tipoPessoa;
    }

    public void setTipoPessoa(String tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getEnderecoComercial() {
        return enderecoComercial;
    }

    public void setEnderecoComercial(String enderecoComercial) {
        this.enderecoComercial = enderecoComercial;
    }

    public String getEnderecoResidencial() {
        return enderecoResidencial;
    }

    public void setEnderecoResidencial(String enderecoResidencial) {
        this.enderecoResidencial = enderecoResidencial;
    }
}
