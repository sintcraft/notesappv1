# notesappv1
one more notes app :D

this is a personal project for me nothing more :D

this is built whit javasacript, ejs, html, css and mysql

- add file ".env"
- in the file ".env" add these lines 
  ```
  dataBaseUrl = URL
  passwordAdmin = YOURPASWORD
  ```
- create database
database structure

notes #table
-----------
  - id PRIMARY_KEY AUTO_INCREMENT INT(11) NOT NULL
  - status INT(11) NOT NULL
  - date DATE NOT NULL
  - title MEDIUMTEXT NOT NULL
  - description LONGTEXT NOT NULL

- execute in your terminal
  ```
  npm install
  npm run start
  ```
