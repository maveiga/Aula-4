# Aula-4
# Query sql
CREATE DATABASE youtube;

USE youtube;

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50),
  email VARCHAR(100)
);

USE youtube;

INSERT INTO user (nome, email) VALUES
  ('João Silva', 'joao.silva@example.com'),
  ('Maria Santos', 'maria.santos@example.com'),
  ('Pedro Almeida', 'pedro.almeida@example.com');
  
# Docker run 
docker run -p 3000:3000 --name aula-cc -d mateusveiga/ex:0.0.1

#
http://localhost:3000/consulta-dados

#docker hub 
https://hub.docker.com/r/mateusveiga/ex
docker pull mateusveiga/ex

#git
https://github.com/maveiga/Aula-4
