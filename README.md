# exjobb2018
The 'official' repo for my bachelor thesis project, at Högskolan i Skövde, 2018.

## A quick introduction
This project introduces <img src="https://github.com/a15elibr/exjobb2018/blob/master/migwiz/public/images/mini.png?raw=true" width="15"> **MigWiz**, a wizard for database migration for Multi-site CMS's. Specifically, this wizard migrates WordPress applications to Keystone JS. The full written report for this project can be found at http://urn.kb.se/resolve?urn=urn:nbn:se:his:diva-15549.

## Background
Multi-site applications in WordPress are currently experiencing performance issues connected to a high number of users or subdomains. This project theorizes that these performance issues originates from the limitations of SQL-databases, and therefor, can be solved by migrating to another database system. Specifically, the NoSQL database MongoDB is proposed as a solution, given its' advantages over MySQL regarding certain functionalities, such as handling large number of uses and massive data sets. To enable users without prior technological skills to migrate their WordPress applications to the more new CMS-system Keystone JS, which is using MongoDB, a migration tool is proposed: <img src="https://github.com/a15elibr/exjobb2018/blob/master/migwiz/public/images/mini.png?raw=true" width="15"> **MigWiz**. 

## Code structure
#### /keystonejs/ 
The folder keystonejs contains the full application code for the modified Keystone JS application that is created in this project. Keystone JS is an Express application, running on Node JS. The application has been modified to include a way of handling subdomains, enable existing users to change their password and enable new users to recieve an email through which their password can be changed.

#### /migwiz/
This folder contains the full code for the migrating tool application (MigWiz!). MigWiz is, similar to keystone JS, an Express application running on Node JS. MigWiz is an easy to use migration wizard which includes migration of the complete user system of the WordPress application.

#### /misc/ 
This folder contains some miscellanious code that has been used in this project, such as SQL code for creating tables, Tampermonkey code for adding users to the WordPress application and a text generator for generating life-like, generic text for blog posts.

## Contact 
This project was conducted during the spring of 2018, at Högskolan i Skövde, as a bachelor thesis project for the program "web development & programming". The sole author is me, Elin Brown. Contact email: elin@elinbrown.nu
