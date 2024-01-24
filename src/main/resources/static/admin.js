$(document).ready(function() {
    loadUsers();
})


function loadUsers() {
    $.get( "/admin/getUsers", function( users ) {
        $('#users_table tr').not(':first').remove();
        jQuery.each(users, function(i, user) {
             $("#users_table").append("<tr>" +
             "<td>" + user.id.toString() + "</td>" +
             "<td>" + user.firstName + "</td>" +
             "<td>" + user.lastName + "</td>" +
             "<td>" + user.username + "</td>" +
             "<td><button type=\"button\" class=\"btn btn-outline-primary btn-sm\" onclick=\"showUserForm("+user.id.toString()+")\">Edit</button></td>" +
             "<td><button type=\"button\" class=\"btn btn-outline-danger btn-sm\" onclick=\"deleteUser("+user.id.toString()+")\">Delete</button></td>" +
             "</tr>");
        });
    });
}

function showUserForm(user_id) {
    $("#user_form_div").show();
    $('#user_form')[0].reset();
    $("#user_id").text("");

    if (user_id != 0) {
        $.get( "/admin/getUserDetails?id="+user_id.toString(), function(user) {
            $("#user_id").val(user.id.toString());
            $("#firstName").val(user.firstName);
            $("#lastName").val(user.lastName);
            $("#username").val(user.username);
        })
    }
}

function submitUserForm() {
    user_id = $("#user_id").val();
    user = {
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "username": $("#username").val(),
        "password": $("#password").val(),
    }
    if (user_id == 0) {
        action = "create";
    } else {
        action = "edit";
        user.id = $("#user_id").val();
    }

    $.ajax("/admin/" + action, {
        data : JSON.stringify(user),
        contentType : 'application/json',
        type : 'POST',
        success: function() {
            $("#user_form_div").hide();
            loadUsers();
        }
    })
}

function deleteUser(user_id) {
    let result = confirm("Удалить пользователя?");
    if (result == true) {
        $.get( "/admin/delete?id="+user_id.toString(), function() {
            loadUsers();
        })
    }
}