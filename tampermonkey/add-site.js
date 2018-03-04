// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.kaermorhen.r4t/wp-admin/network/site-new*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var counter = localStorage.getItem("counter");
    var userPrefix = "student";

    if(counter < 1000){

    // add values
    document.getElementById('site-address').value = userPrefix+counter;
    document.getElementById('site-title').value = "Student blog";
    document.getElementById('admin-email').value = userPrefix+counter + "@kaermorhen.r4t";

    // incr coutner
    counter++;
    localStorage.setItem("counter", counter);

    // submit
    document.querySelector('form').submit();
    } else {
        alert("No more!");
    }
    
})();