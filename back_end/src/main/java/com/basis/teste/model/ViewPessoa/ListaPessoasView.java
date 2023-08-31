package com.basis.teste.model.ViewPessoa;


import jakarta.persistence.*;
@Entity
@Table(name = "ListaPessoasView")
public class ListaPessoasView {

    @Id
    private int id;

    private String email;

    private String contato;


    private String tipo_pessoa;

    private String nome;

    private String documento;

    private String endereco_residencial;

    @Column()
    private String endereco_comercial;


    public ListaPessoasView() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public ListaPessoasView(int id, String email, String contato, String tipoPessoa, String nome, String documento,
                            String endereco_residencial, String endereco_comercial) {

        this.id = id;
        this.email = email;
        this.contato = contato;
        this.tipo_pessoa = tipoPessoa;
        this.nome = nome;
        this.documento = documento;
        this.endereco_residencial = endereco_residencial;
        this.endereco_comercial = endereco_comercial;
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
        return tipo_pessoa;
    }

    public void setTipoPessoa(String tipoPessoa) {
        this.tipo_pessoa = tipoPessoa;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo_pessoa() {
        return tipo_pessoa;
    }

    public void setTipo_pessoa(String tipo_pessoa) {
        this.tipo_pessoa = tipo_pessoa;
    }


    public String getEndereco_residencial() {
        return endereco_residencial;
    }

    public void setEndereco_residencial(String endereco_residencial) {
        this.endereco_residencial = endereco_residencial;
    }

    public String getEndereco_comercial() {
        return endereco_comercial;
    }

    public void setEndereco_comercial(String endereco_comercial) {
        this.endereco_comercial = endereco_comercial;
    }


}
