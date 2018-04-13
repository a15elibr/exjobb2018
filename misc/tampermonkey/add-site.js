// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.wordpress.lc/wp-admin/network/site-new*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Use local storage to keep count of added users
    var counter = localStorage.getItem("counter");
    var userPrefix = "student";
    
    // Add 1000 users
    if(counter < 1000){
        // add values
        document.getElementById('site-address').value = userPrefix+counter;
        document.getElementById('site-title').value = "Student blog";
        document.getElementById('admin-email').value = userPrefix+counter + "@student.wordpress.lc";

        // incr coutner
        counter++;
        localStorage.setItem("counter", counter);

        // submit
        document.querySelector("form").submit();
    } else {
        alert("No more!");
    }
    
});