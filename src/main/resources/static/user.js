$(document).ready(function() {
    $.get( "/user/getDetails", function( user ) {
       $("#user_id").text(user.id);
       $("#first_name").text(user.firstName);
       $("#last_name").text(user.lastName);
       $("#username").text(user.username);
       var roles = "";
       user.roles.forEach(function(role) {
         roles = roles + role.authority + "; "
       });
       $("#roles").text(roles);
     });
    }
)