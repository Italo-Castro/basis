package com.basis.teste.model.Endereco;

public enum TipoEnderecoEnum {

    RESIDENCIAL(0),
    COMERCIAL(1);


    private Integer codigo;


    TipoEnderecoEnum(Integer codigo) {
        this.codigo = codigo;
    }

    public Integer getCodigo() {
        return codigo;
    }


    public static TipoEnderecoEnum getByCodigo(Integer codigo) {
        for (TipoEnderecoEnum enumValue : TipoEnderecoEnum.values()) {
            if (enumValue.codigo == codigo) {
                return enumValue;
            }
        }
        return null;
    }

}
