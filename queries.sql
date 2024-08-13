CREATE DATABASE GerenciaBook

CREATE TABLE users (
  id uuid default gen_random_uuid() PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL
)