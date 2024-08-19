CREATE DATABASE GerenciaBook

CREATE TABLE users (
  id uuid default gen_random_uuid() PRIMARY KEY,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
)

CREATE TABLE books (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  book_name varchar(100) NOT NULL,
  student_name varchar(100) NOT NULL,
  student_class varchar(4) NOT NULL,
  lend_day DATE NOT NULL
)