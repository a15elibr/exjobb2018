var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// ----------------------
// MIGRATE step 4
// actual insertion of posts
// ----------------------


router.get('/', function(req, res, next) {
    
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "elinis",
      database: "slash"
    });
    con.connect();
    
    // variables
    var posts = [];
    var query = "SELECT all_user_posts6.post_id, all_user_posts6.post_author, all_user_posts6.post_title, all_user_posts6.post_date, all_user_posts6.post_modified, all_user_posts6.post_type, all_user_posts6.post_content, all_user_posts6.post_password, all_user_posts6.post_status, all_user_posts6.post_name, all_user_posts6.post_parent, keystone_id_map2.k_id FROM all_user_posts6 INNER JOIN keystone_id_map2 ON all_user_posts6.post_author = keystone_id_map2.wp_id;";
    
    // QUERY
    // ------------------
    con.query(query, function(err, rows, fields) {
        
        if (err) {
            console.log(err);
        } else {
            // loop through result
            for (var i = 0; i < rows.length; i++) {
                
                    // setting correct syntax for published posts
                    var kState = rows[i].post_status;
                    var state;
                
                    if(kState == "publish"){
                        state = "published";
                    }else{
                        state = "draft";
                    }
                
                    // generate a random slug
                    var slug = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                
                    // making sure author relationship will work
                    var ObjectID = mongoose.Types.ObjectId;

                    // save to object
                    var post = {
                        'slug': slug,
                        'title': rows[i].post_title,
                        'state': state,
                        'author': new ObjectID(rows[i].k_id),
                        'publishedDate': rows[i].post_date,
                        'modifiedDate': rows[i].post_modified,
                        'wp_id': rows[i].post_author,
                        'type': rows[i].post_type,
                        'content': {
                            'extended': rows[i].post_content,
                        },
                        'password': rows[i].post_password,
                        'post_id': rows[i].post_id,
                        'post_parent': rows[i].post_parent,
                    }

                    // Add object into array
                    posts.push(post);
                }
            
            mongoose.connect('mongoDB://localhost:27017/keystone', function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('connected');
                }
            });

            // inserting 
            var conn2 = mongoose.connection;
            conn2.collection('posts').insert(posts, function(err, result) {
                if(err){
                    console.log(err);
                } else {
                    console.log("user insertion successfull");
                }
            });
            res.render('migrate4', {posts: posts});
        }
    });

    // close con
    con.end();
});



module.exports = router;