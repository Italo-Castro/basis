CREATE VIEW lista_pessoas_view AS

SELECT 
    p.id,
    p.email,
    p.ddd + '-' + p.telefone AS contato,
    CASE 
        WHEN ISNULL(ende.tipo_endereco,0) = '0' THEN  ende.endereco +  ',' + ISNULL(ende.complemento,'') + ',' + ende.bairro + ',' + ende.cep + ',' + ende.cidade + ',' + COALESCE(ende.uf,'')
		ELSE ''
    END AS endereco_residencial,
    CASE 
        WHEN ISNULL(ende.tipo_endereco,1) = '1' THEN ende.endereco + ',' + ISNULL(ende.complemento,'') + ',' + ende.bairro + ',' + ende.cep + ',' + ende.cidade + ',' + COALESCE(ende.uf,'')
        ELSE ''
    END AS endereco_comercial,
    CASE 
        WHEN p.tipo_Pessoa = 0 THEN 'Pessoa Física'
        WHEN p.tipo_Pessoa = 1 THEN 'Pessoa Jurídica'
        ELSE 'Desconhecido'
    END AS tipo_pessoa,
    doc.Nome,
    doc.Documento
FROM Pessoa p
LEFT JOIN endereco_pessoa ed ON ed.pessoa_id = p.id
LEFT JOIN endereco ende ON ed.endereco_id = ende.id 
CROSS APPLY RetornaDocumentoENome(p.tipo_pessoa, p.cpf, p.cnpj, p.nome, p.razao_social) AS doc;



