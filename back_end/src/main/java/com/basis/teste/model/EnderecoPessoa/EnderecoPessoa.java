package com.basis.teste.model.EnderecoPessoa;

import com.basis.teste.model.Endereco.Endereco;
import com.basis.teste.model.Pessoa.Pessoa;
import jakarta.persistence.*;


import java.io.Serializable;

@Entity
@IdClass(EnderecoPessoa.class)
@Table(name = "endereco_pessoa")

public class EnderecoPessoa implements Serializable {


    @Id
    @ManyToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @Id
    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    public EnderecoPessoa() {}

    public EnderecoPessoa(Endereco endereco, Pessoa pessoa) {
        this.endereco = endereco;
        this.pessoa = pessoa;
    }


    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
}
