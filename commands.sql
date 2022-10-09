 CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (url, title) values ('www.lol.fi', 'lolollooll');

insert into blogs (author, url, title) values ('make', 'www.blogi.fi', 'tsajajaja');

select * from blogs;