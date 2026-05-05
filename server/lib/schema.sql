create table jobs(
    id serial primary key,
    title varchar(255) not null,
    company varchar(255) not null,
    location varchar(255) not null,
    salary integer not null
);

create table users(
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    role varchar(255) not null
);

create table applications(
    id serial primary key,
    job_id integer references jobs(id),
    user_id integer references users(id),
    resume_url varchar(255) ,
    cover_letter text,
    status varchar(255) default 'pending'
);

create table saved_jobs(
    id serial primary key,
    user_id integer references users(id),
    job_id integer references jobs(id),
    unique(user_id, job_id)
);



