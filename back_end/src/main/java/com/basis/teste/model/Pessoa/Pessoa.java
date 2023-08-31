package com.basis.teste.model.Pessoa;

import com.basis.teste.model.Endereco.Endereco;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table( name= "pessoa" )
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Pessoa implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ddd;

    private String telefone;

    private String email;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "tipo_pessoa")
    private TipoPessoaEnum tipoPessoa;

    private String cpf;

    private String cnpj;

    private String nome;

    @Column(name ="razao_social")
    private String razaoSocial;

    @ManyToMany
    @JoinTable(
            name = "endereco_pessoa",
            joinColumns = @JoinColumn(name = "pessoa_id"),
            inverseJoinColumns = @JoinColumn(name = "endereco_id")
    )
    private List<Endereco> enderecos;

    public Pessoa() {}

    public Pessoa(Long id, String ddd, String telefone, String email, TipoPessoaEnum tipoPessoa, String cnpj, String cpf, String nome, String razaoSocial,  List<Endereco> enderecos) {
        this.id = id;
        this.ddd = ddd;
        this.telefone = telefone;
        this.email = email;
        this.tipoPessoa = tipoPessoa;
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.nome = nome;
        this.razaoSocial = razaoSocial;
        this.enderecos = enderecos;
    }

    public Pessoa(DadosNovaPessoaDTO dados) {
        this.cnpj = dados.cnpj();
        this.cpf = dados.cpf();
        this.tipoPessoa = TipoPessoaEnum.getByCodigo(dados.tipoPessoa());
        this.ddd = dados.ddd();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.cpf = dados.cpf();
        this.cnpj = dados.cnpj();
        this.nome = dados.nome();
        this.razaoSocial = dados.razaoSocial();
    }


    public void atualizarPessoa(DadosNovaPessoaDTO dados) {
        if (!dados.nome().isEmpty()) {
            this.nome = dados.nome();
        }

        if (dados.tipoPessoa() != null) {
            this.tipoPessoa = TipoPessoaEnum.getByCodigo(dados.tipoPessoa());
        }

        if (!dados.cnpj().isEmpty()) {
            this.cnpj = dados.cnpj();
        }

        if (!dados.cpf().isEmpty()) {
            this.cpf = dados.cpf();
        }

        if (!dados.ddd().isEmpty()) {
            this.ddd = dados.ddd();
        }

        if (!dados.email().isEmpty()) {
            this.email = dados.email();
        }
        if (!dados.telefone().isEmpty()) {
            this.telefone = dados.telefone();
        }

        if (!dados.nome().isEmpty()) {
            this.nome = dados.nome();
        }

        if (!dados.razaoSocial().isEmpty()) {
            this.razaoSocial = dados.razaoSocial();
        }

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDdd() {
        return ddd;
    }

    public void setDdd(String ddd) {
        this.ddd = ddd;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public TipoPessoaEnum getTipoPessoa() {
        return tipoPessoa;
    }

    public void setTipoPessoa(TipoPessoaEnum tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pessoa pessoa = (Pessoa) o;
        return Objects.equals(id, pessoa.id) && Objects.equals(ddd, pessoa.ddd) && Objects.equals(telefone, pessoa.telefone) && Objects.equals(email, pessoa.email) && tipoPessoa == pessoa.tipoPessoa && Objects.equals(cpf, pessoa.cpf) && Objects.equals(cnpj, pessoa.cnpj);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ddd, telefone, email, tipoPessoa, cpf, cnpj);
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "id=" + id +
                ", ddd='" + ddd + '\'' +
                ", telefone='" + telefone + '\'' +
                ", email='" + email + '\'' +
                ", tipoPessoa=" + tipoPessoa +
                ", cpf='" + cpf + '\'' +
                ", cnpj='" + cnpj + '\'' +
                '}';
    }
}
