package com.basis.teste.model.Endereco;

import com.basis.teste.model.Pessoa.Pessoa;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity()
@Table(name = "Endereco")
public class Endereco implements Serializable {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String endereco;

    private Integer numero;

    private String bairro;

    private String complemento;

    private String cidade;

    private String cep;

    private String uf;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "tipo_endereco")
    private TipoEnderecoEnum tipoEnderecoEnum;


    @ManyToMany(mappedBy = "enderecos")
    private List<Pessoa> pessoas;

    public Endereco(Long id, String endereco, Integer numero, String bairro, String complemento, String cidade, String cep, String uf) {
        this.id = id;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.complemento = complemento;
        this.cidade = cidade;
        this.cep = cep;
        this.uf = uf;
    }

    public Endereco(DadosNovoEnderecoDTO dados) {
        this.endereco = dados.endereco();
        this.numero = dados.numero();
        this.bairro = dados.bairro();
        this.complemento = dados.complemento();
        this.cidade = dados.cidade();
        this.cep = dados.cep();
        this.uf = dados.uf();
        this.tipoEnderecoEnum = TipoEnderecoEnum.getByCodigo(dados.tipoEndereco());
    }

    public Endereco() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }
}
