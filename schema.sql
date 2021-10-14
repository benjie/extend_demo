drop schema if exists app cascade;

create schema app;
create table app.somethings (
  id serial primary key,
  t text
);
insert into app.somethings (t) values ('hello'), ('world');
