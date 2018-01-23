drop database if exists reddit;
create database reddit;
use reddit;

create table user (
  id int auto_increment primary key,
  name varchar(250),
  email varchar(250),
  password varchar(250)
);

create table thread (
  id int auto_increment primary key,
  user_id int,
  title varchar(100),
  content varchar(5000),
  foreign key (user_id) references user(id)
);

create table comment (
  id int auto_increment primary key,
  user_id int,
  thread_id int,
  comment_id int,
  content varchar(500),
  foreign key (user_id) references user(id),
  foreign key (thread_id) references thread(id),
  foreign key (comment_id) references comment(id)
);

insert into user (name, email) values
  ('alice', 'alice@gmail.com'),
  ('bob', 'bob@gmail.com'),
  ('cam', 'cam@gmail.com');

insert into thread (user_id, title, content) values
  (1, 'Bad Coffee', 'I got some really bad coffee the other day... What should I do?'),
  (2, 'Hungry Jacks is Amazing!', 'They have really good voucher deals that you have to ask for. They are so cheap! What do you guys think?');

insert into comment (user_id, thread_id, comment_id, content) values
  (1, 1, null, 'Wow that blows.'),
  (2, 1, 1, 'No you blow.'),
  (3, 1, 2, 'That escalated quickly.'),
  (1, 1, null, 'Maybe you should file a complaint'),
  (2, 2, null, 'Do not like Hungry Jacks that much');


