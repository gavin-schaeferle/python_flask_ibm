/// <reference path="../typings/globals/jquery/index.d.ts" />

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function updateNavClass() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*On Load determine which page should be active*/
$(function () {
    //remove all other active classes
    var links = $('.topNav a');
    for(var i = 0; i < links.length; i++){
        links[i].toggleClass("active", false);
    }

    //get page name and set that link to active
    var pageName = document.location.href.match(/[^\/]+$/)[0];
    var link = $('a[href="' + pageName + '"]');
    link.toggleClass("active");
});