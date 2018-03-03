// ==UserScript==
// @name         REDIRECT AT USER_ID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.kaermorhen.r4t/wp-admin/network/user-new.php?user_id=*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    location.reload();
    window.location.href = "http://www.kaermorhen.r4t/wp-admin/network/user-new.php";




})();