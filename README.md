# Instruções de Configuração e Execução do Projeto

Este guia fornece instruções passo a passo para configurar e executar o projeto, incluindo o front end e o back end, bem como a configuração do banco de dados.

## 1. Clonar o Repositório

Clone o repositório do projeto em um diretório de sua escolha.


## 2. Configuração do Front End

- Abra o Visual Studio Code.
- Navegue até o diretório do front end do projeto.
- Abra o terminal no Visual Studio Code.

## 3. Instalar Dependências do Front End

No terminal, execute o seguinte comando para instalar as dependências necessárias:
```bash
yarn install
```


## 4. Configuração do Banco de Dados SQL Server 2016

- Certifique-se de que você tenha o SQL Server 2016 instalado e em execução.

## 5. Criar o Banco de Dados

No SQL Server Management Studio ou outra ferramenta de gerenciamento, crie o banco de dados chamado "basis".

## 6. Executar os Scripts SQL

- Execute o "script1" para criar as tabelas no banco de dados "basis".
- Execute o "script2" para criar a procedure.
- Execute o "script3" para criar a função.

## 7. Configuração do Back End

- Navegue até o diretório do back end do projeto.
- Abra o arquivo "application.properties".

## 8. Configurar o DataSource do Back End

No arquivo "application.properties", configure a URL, usuário e senha do banco de dados:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=basis;user=sa;password=8523;trustServerCertificate=true
spring.jpa.database-platform=org.hibernate.dialect.SQLServerDialect
server.port=5200
```
## 9. Execute os dois projetos. 
##### O comando yarn start, na pasta do front-end, irá startar a aplicação.
##### O back_end pode ser startado pela IDE

## As bibliotecas usadas estão no readme.md de cada projeto
