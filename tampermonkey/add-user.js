// ==UserScript==
// @name         Add new user
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  add new user script
// @author       You
// @match        http://www.kaermorhen.r4t/wp-admin/network/user-new.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // var
    var counter = localStorage.getItem("counter");
    var userPrefix = "student";

    // add values
    document.getElementById('username').value=userPrefix+counter;
    document.getElementById('email').value=userPrefix+counter + "@kaermorhen.r4t";

    // incr coutner
    counter++;
    localStorage.setItem("counter", counter);

    // submit
    document.querySelector('form').submit();
})();