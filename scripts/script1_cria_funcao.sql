-- Criando a função
CREATE FUNCTION RetornaDocumentoENome
(
    @tipo_pessoa INT,
    @cpf NVARCHAR(14),
    @cnpj NVARCHAR(18),
    @nome NVARCHAR(100),
    @razao_social NVARCHAR(100)
)
RETURNS TABLE
AS RETURN
(
    SELECT 
        CASE 
            WHEN @tipo_pessoa = 0 THEN @cpf
            WHEN @tipo_pessoa = 1 THEN @cnpj
            ELSE ''
        END AS Documento,

        CASE 
            WHEN @tipo_pessoa = 0 THEN @nome
            WHEN @tipo_pessoa = 1 THEN @razao_social
            ELSE ''
        END AS Nome
);

