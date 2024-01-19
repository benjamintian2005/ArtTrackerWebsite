

select column_name, data_type, character_maximum_length, column_default, is_nullable
from INFORMATION_SCHEMA.COLUMNS where table_name = 'users';  
ALTER TABLE mytable ALTER COLUMN mycolumn DROP NOT NULL;


insert into users(id, name, username, email) values(5, 'b', 'b@gmail.com', 'email.jpg');
insert into users(id, name, username, email) values(6, 'c', 'c@gmail.com', 'email.jpg');
insert into users(id, name, username, email) values(9, 'd', 'd@gmail.com', 'email.jpg');
insert into users(id, name, username, email) values(20, 'e', 'e@gmail.com', 'email.jpg');
insert into users(id, name, username, email) values(21, 'babasbs', 'b@gmail.com', 'email.jpg');
insert into users(id, name, username, email) values(22, 'ab', 'b@gmail.com', 'email.jpg');




insert into follows(Following_user_id, Followed_user_id) values(20, 2);
insert into follows(Following_user_id, Followed_user_id) values(2, 20);
insert into follows(Following_user_id, Followed_user_id) values(5, 2);
insert into follows(Following_user_id, Followed_user_id) values(2, 5);
insert into follows(Following_user_id, Followed_user_id) values(5, 6);
insert into follows(Following_user_id, Followed_user_id) values(6, 5);

insert into posts(user_id, title, content) values(20, 'title by 20', 'content');
insert into posts(user_id, title, content) values(20, 'title by 20 (1)', 'content');
insert into posts(user_id, title, content) values(5, 'title by 5', 'content');
insert into posts(user_id, title, content) values(5, 'title by 5 (1)', 'content');

SELECT * FROM posts WHERE user_id in 
(SELECT Followed_user_id FROM follows WHERE Following_user_id = 2)