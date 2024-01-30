$(document).ready(function() {
    getCurrentUserCredentials();
    getAllowedPages();
})


function getCurrentUserCredentials() {
    $.get( "/user/getDetails", function( user ) {
       $("#header_username").text(user.username);
       var roles = "";
       user.roles.forEach(function(role) {
         roles = roles + role.authority + "; "
       });
       $("#header_roles").text(roles);
     });
}

function getAllowedPages() {
    $.get( "/user/getAllowedPages", function( pages ) {
       $("#left_menu").empty();
       for (const [url, title] of Object.entries(pages)) {
        var link = $("<a class='list-group-item list-group-item-action py-2 ripple'></a>")
        link.text(title);
        link.attr('href', url);
        if(window.location.pathname.includes(url)) {
             link.addClass("active");
        }
        $("#left_menu").append(link)
       }

     });
}