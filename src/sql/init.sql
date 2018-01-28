drop database if exists reddit;
create database reddit;
use reddit;

create table user (
  id int auto_increment primary key,
  first_name varchar(250),
  last_name varchar(250),
  email varchar(250),
  password varchar(250),
  created_at timestamp default now(),
  archived boolean default false
);

create table thread (
  id int auto_increment primary key,
  user_id int,
  title varchar(100),
  content varchar(5000),
  created_at timestamp default now(),
  archived boolean default false,
  foreign key (user_id) references user(id)
);

create table comment (
  id int auto_increment primary key,
  user_id int,
  thread_id int,
  comment_id int,
  content varchar(500),
  created_at timestamp default now(),
  archived boolean default false,
  foreign key (user_id) references user(id),
  foreign key (thread_id) references thread(id),
  foreign key (comment_id) references comment(id)
);

create table follow (
  follower_id int,
  followee_id int,
  created_at timestamp default now(),
  foreign key (follower_id) references user(id),
  foreign key (followee_id) references user(id),
  primary key (follower_id, followee_id)
);

create table comment_like (
  user_id int,
  comment_id int,
  created_at timestamp default now(),
  foreign key (user_id) references user(id),
  foreign key (comment_id) references comment(id),
  primary key (user_id, comment_id)
);

create table thread_like (
  user_id int,
  thread_id int,
  created_at timestamp default now(),
  foreign key (user_id) references user(id),
  foreign key (thread_id) references comment(id),
  primary key (user_id, thread_id)
);

insert into user (first_name, last_name, email, password) values
  ('alice', 'chan', 'alice@gmail.com', '$2a$10$yESmEA2QOYF53yfU6IvPuOd8i8w7NmBWknb0mhJ5myPfTBq7abUWi'),
  ('bob', null, 'bob@gmail.com', '$2a$10$yESmEA2QOYF53yfU6IvPuOd8i8w7NmBWknb0mhJ5myPfTBq7abUWi'),
  (null, 'gorby', 'cam@gmail.com', '$2a$10$yESmEA2QOYF53yfU6IvPuOd8i8w7NmBWknb0mhJ5myPfTBq7abUWi');

insert into thread (user_id, title, content) values
  (1, 'Bad Coffee', 'I got some really bad coffee the other day... What should I do?'),
  (2, 'Hungry Jacks is Amazing!', 'They have really good voucher deals that you have to ask for. They are so cheap! What do you guys think?');

insert into comment (user_id, thread_id, comment_id, content) values
  (1, 1, null, 'Wow that blows.'),
  (2, 1, 1, 'No you blow.'),
  (3, 1, 2, 'That escalated quickly.'),
  (1, 1, null, 'Maybe you should file a complaint'),
  (2, 2, null, 'Do not like Hungry Jacks that much');

insert into follow (follower_id, followee_id) values
  (1, 2),
  (3, 2),
  (2, 1);

insert into comment_like (user_id, comment_id) values
  (1, 1),
  (2, 1),
  (3, 1),
  (2, 2);

insert into thread_like (user_id, thread_id) values
  (1, 1),
  (2, 1),
  (3, 2);

