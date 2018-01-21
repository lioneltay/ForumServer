drop database if exists reddit;
create database reddit;
use reddit;

create table user (
  id int auto_increment primary key,
  name varchar(250),
  email varchar(250),
  password varchar(250)
);

create table post (
  id int auto_increment primary key,
  user_id int,
  content varchar(500),
  votes int,
  foreign key (user_id) references user(id)
);

insert into user (name, email) values
  ('bob', 'bob@gmail.com'),
  ('james', 'james@gmail.com');

insert into post (user_id, content, votes) values
  (1, 'Wow this blows', 0),
  (1, 'cheese is tasty', 99),
  (1, 'Holiday time', 2),
  (2, 'Bored out of my mind', 1);


