const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

module.exports = createUsers;





























/*
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upda ted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

//COMANDOS DDL (DATA DEFINITION LANGUAGE)
-CRATE
-DROP
-ALTER

// ALTERAR O NOME DA TABELA USERS

ALTER TABLE users
RENAME TO clients

//ADICIONAR UM CAMPO STATUS DO TIPO VARCHAR
ALTER TABLE users
ADD status VARCHAR

//ALTERAR O NOME DA COLUNA status
RENAME COLUMN status TO active

// DELETAR A COLUNA status
DROP COLUMN status


////////////MAIS COMANDOS SQL///////////////
    Comandos DML (Data Manipulation Language)
    C-Create(INSERT)
    R-Read(SELECT)
    U-Update(UPDATE)
    D-Delete(DELETE)


/////////ADICIONANDO NOS USUÁRIOS/////////
    INSERT INTO users
    (name, email, password)
    VALUES
    ('João', "joao@gmail.com", '123');

    SELECT * FROM users;
    
    !!!!ATENÇÃO AO APERTAR O BOTÃO RUN!!!
    SELECIONAR OS CAMPOS CORRETOS
    para adicionar novos usuários apenas apagar e escrever os dados do novo usuário


    COMANDO UPDATE

        UPDATE users SET 
        avatar = 'joao.png'
        name = 'joão silva'
        WHERE id = 1
RUN

!!!!!ATENÇÃO!!!!!
é preciso usar o comando WHERE para especificar o usuário


COMANDO DELETE

    DELETE FROM users 
    WHERE id = 1



*/