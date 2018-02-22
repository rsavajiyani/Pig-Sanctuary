CREATE DATABASE pig_sanctuary_db;
USE pig_sanctuary_db;

CREATE table pigs
(
    id int NOT NULL AUTO_INCREMENT,
    pig_name varchar (300) NOT NULL,
    pig_gender varchar(2) NOT NULL,
    pig_color varchar(300) NOT NULL,
    pig_bio varchar(300) NOT NULL,
    pig_img varchar(300) NOT NULL,
    isAdopted BOOL DEFAULT false,
    PRIMARY KEY(id)
);

CREATE table people
(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar (300) NOT NULL,
    last_name varchar (300) NOT NULL,
    email varchar (300) NOT NULL,
    phone varchar (300) NOT NULL,
    isVolunteer BOOL DEFAULT false,
    PRIMARY KEY(id)
);
