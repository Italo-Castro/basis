package com.basis.teste.model.Pessoa;

public enum TipoPessoaEnum {

    PESSOA_FISICA(0),
    PESSOA_JURICA(1);


    private Integer codigo;


    TipoPessoaEnum(Integer codigo) {
        this.codigo = codigo;
    }

    public Integer getCodigo() {
        return codigo;
    }


    public static TipoPessoaEnum getByCodigo(Integer codigo) {
        for (TipoPessoaEnum enumValue : TipoPessoaEnum.values()) {
            if (enumValue.codigo == codigo) {
                return enumValue;
            }
        }
        return null;
    }

}
