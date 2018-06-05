
/* ----------------------------------
   Whatever the WPDB is called 
   ---------------------------------- */
use wordpress;

/* ----------------------------------
   Tables
   ---------------------------------- */

CREATE TABLE keystone_id_map (
	wp_id INT,
	k_id VARCHAR(255),
	PRIMARY KEY(wp_id, k_id)
);

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

/* ----------------------------------
   Queries 
   ---------------------------------- */

SELECT 	all_user_posts6.post_id, 
		all_user_posts6.post_author, 
        all_user_posts6.post_title, 
        all_user_posts6.post_date, 
        all_user_posts6.post_modified, 
        all_user_posts6.post_type, 
        all_user_posts6.post_content, 
        all_user_posts6.post_password, 
        all_user_posts6.post_status, 
        all_user_posts6.post_name, 
        all_user_posts6.post_parent, 
        keystone_id_map2.k_id 
FROM all_user_posts6 
INNER JOIN keystone_id_map2 ON all_user_posts6.post_author = keystone_id_map2.wp_id;

SELECT  wp_users.ID AS wp_id,
        wp_users.user_email AS email,
        wp_users.user_login AS username,
        wp_users.user_registered AS regDate,
        wp_blogs.path AS subname,
        metafirstname.meta_value AS firstname,
        metalastname.meta_value AS lastname,
        metadescription.meta_value AS description,
        metanickname.meta_value AS nickname
FROM    wp_users
INNER JOIN wp_blogs ON wp_users.ID = wp_blogs.blog_id
LEFT JOIN wp_usermeta metafirstname ON wp_users.ID = metafirstname.user_id AND metafirstname.umeta_id = 25
LEFT JOIN wp_usermeta metalastname ON wp_users.ID = metalastname.user_id AND metalastname.umeta_id = 26
LEFT JOIN wp_usermeta metadescription ON wp_users.ID = metadescription.user_id AND metadescription.umeta_id = 2
LEFT JOIN wp_usermeta metanickname ON wp_users.ID = metanickname.user_id AND metanickname.umeta_id = 1;