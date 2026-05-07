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

INSERT INTO instrutores (nome, email, telefone, area_atuacao)
VALUES
('Carlos','carlos@gmail.com','(51)999237493','Doutor em Ciências da Computacao'),
('Maria','maria@gmail.com','(51)999237495','Psicologa'),
('João','joao@gmail.com','(51)999237406','CEO da Empresa Games.com');

INSERT INTO oficinas (titulo, descricao, categoria, carga_horaria, data_oficina, horario, total_vagas, fk_instrutor) 
VALUES
    ('Oficina de ADS','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor sapien. Sed nec augue varius ante posuere pharetra nec eget purus.','Tecnologia','10 Horas','05-2026','10:30','8','1'),
    ('Oficina de Autoconhecimento','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor sapien. Sed nec augue varius ante posuere pharetra nec eget purus.','Autoconhecimento','10 Horas','03-05-2026','15:00','8','2'),
    ('Oficina de Desenvolvimento de Jogos','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor sapien. Sed nec augue varius ante posuere pharetra nec eget purus.','Tecnologia','10 Horas','04-05-2026','7:30','8','3'),
    ('Oficina de Design para Redes Sociais','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor sapien. Sed nec augue varius ante posuere pharetra nec eget purus.','Tecnologia','10 Horas','04-05-2026','10:30','8','4'),
    ('Oficina de Introdução à Programação','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tortor sapien. Sed nec augue varius ante posuere pharetra nec eget purus.','Tecnologia','10 Horas','08-05-2026','7:30','8','8');
