CREATE DATABASE OPENTUTORIALS;
USE OPENTUTORIALS;

CREATE TABLE AUTHOR (
	ID 		INT AUTO_INCREMENT,
    NAME	VARCHAR(20) NOT NULL,
    PROFILE	VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY(ID)
);

INSERT INTO AUTHOR(NAME, PROFILE) VALUES('egoing', 'developer');	-- 1
INSERT INTO AUTHOR(NAME, PROFILE) VALUES('duru', 'database administrator');  -- 2
INSERT INTO AUTHOR(NAME, PROFILE) VALUES('taeho', 'data scientist, developer');  -- 3

SELECT * FROM AUTHOR;

CREATE TABLE TOPIC (
	ID			INT AUTO_INCREMENT,
    TITLE		VARCHAR(30) NOT NULL,
    DESCRIPTION	TEXT,
    CREATED		DATETIME NOT NULL DEFAULT NOW(),
    AUTHOR_ID	INT DEFAULT NULL,
    PRIMARY KEY(ID)
);

INSERT INTO TOPIC(TITLE, DESCRIPTION, AUTHOR_ID) VALUES('MySQL', 'MySQL is ...', 1);
INSERT INTO TOPIC(TITLE, DESCRIPTION, AUTHOR_ID) VALUES('Oracle', 'Oracle is ...', 1);
INSERT INTO TOPIC(TITLE, DESCRIPTION, AUTHOR_ID) VALUES('SQL SERVER', 'SQL SERVER is ...', 2);
INSERT INTO TOPIC(TITLE, DESCRIPTION, AUTHOR_ID) VALUES('PostgreSQL', 'PostgreSQL is ...', 3);
INSERT INTO TOPIC(TITLE, DESCRIPTION, AUTHOR_ID) VALUES('MongoDB', 'MongoDB is ...', 1);

SELECT * FROM TOPIC;
DROP TABLE TOPIC;




