
/* Use whatever the WordPres database is called */
use slash;

/* 
 * * * * * * * * * * * * * * 
 * Tables created for keeping all posts
 * and one table for keeping all ID's from both applications
 * * * * * * * * * * * * * *
 */ 

DROP TABLE keystone_id_map;
CREATE TABLE keystone_id_map (
	wp_id INT,
	k_id VARCHAR(255),
	PRIMARY KEY(wp_id, k_id)
);

DROP TABLE all_user_posts;
CREATE TABLE all_user_posts (
	post_id INT,
	post_author INT,
    post_title varchar(255),
    post_date DATETIME,
    post_modified DATETIME,
    post_type varchar(4),
    post_content nvarchar(4000),
    post_password varchar(255),
    post_status varchar(255),
    post_name varchar(255),
    post_parent INT,
	PRIMARY KEY(post_author, post_id)
);
