CREATE TABLE pessoa (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ddd NVARCHAR(10),
    telefone NVARCHAR(20),
    email NVARCHAR(100),
    tipo_Pessoa INT, 
    cpf NVARCHAR(14),
    cnpj NVARCHAR(18),
	nome text,
	razao_social text
);


CREATE TABLE endereco (
    id INT IDENTITY(1,1) PRIMARY KEY,
    endereco NVARCHAR(255),
    numero INT,
    bairro NVARCHAR(100),
    complemento NVARCHAR(100),
    cidade NVARCHAR(100),
    cep NVARCHAR(10),
    uf NVARCHAR(2),
    tipo_endereco INT
);

CREATE TABLE endereco_pessoa (
    endereco_id INT,
    pessoa_id INT,
    PRIMARY KEY (endereco_id, pessoa_id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoa(id)
);
