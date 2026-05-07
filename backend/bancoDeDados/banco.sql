CREATE DATABASE sistema_oficinas;
USE sistema_oficinas;

CREATE TABLE participantes (
id_participante INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
cpf VARCHAR(14) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
telefone VARCHAR(20) NOT NULL UNIQUE,
data_nascimento VARCHAR(50) NOT NULL
);

CREATE TABLE instrutores (
id_instrutor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
telefone VARCHAR(20) UNIQUE NOT NULL,
area_atuacao VARCHAR(50) NOT NULL	
);

CREATE TABLE oficinas (
id_oficina INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100) UNIQUE,
descricao TEXT,
categoria VARCHAR(50),
carga_horaria VARCHAR(50),
data_oficina VARCHAR(50),
horario VARCHAR(50),
total_vagas VARCHAR(50),
fk_instrutor INT,
FOREIGN KEY (fk_instrutor) REFERENCES instrutores (id_instrutor)
);

CREATE TABLE inscricoes (
id_inscricao INT PRIMARY KEY AUTO_INCREMENT,
data_inscricao DATETIME DEFAULT CURRENT_TIMESTAMP,
status TINYINT,
fk_oficina INT,
fk_participante INT,
FOREIGN KEY (fk_oficina) REFERENCES oficinas (id_oficina),
FOREIGN KEY (fk_participante) REFERENCES participantes (id_participante)
);