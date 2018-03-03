// ==UserScript==
// @name         Redurect to new user
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.kaermorhen.r4t/wp-admin/network/users.php
// @grant        none
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';
    window.location.href = "http://www.kaermorhen.r4t/wp-admin/network/user-new.php";
})();