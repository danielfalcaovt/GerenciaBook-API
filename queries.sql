CREATE DATABASE GerenciaBook

CREATE TABLE users (
  id uuid default gen_random_uuid() PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  token varchar(250)
)

CREATE TABLE books (
  id uuid gen_random_uuid() PRIMARY KEY,
  book_name varchar(100) NOT NULL,
  student_name varchar(100) NOT NULL,
  lend_day DATE NOT NULL
)