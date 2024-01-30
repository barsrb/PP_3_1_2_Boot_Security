$(document).ready(function() {
    loadUsers();
})


function loadUsers() {
    $.get( "/admin/getUsers", function( users_rest ) {
        $('#users_table tr').not(':first').remove();
        var users = users_rest
        jQuery.each(users, function(i, user) {
        user_id_str = user.id.toString();
         $("#users_table").append("<tr id=\"user_row_" + user_id_str + "\">" +
         "<td id=\"user_id_" + user_id_str + "\">" + user_id_str + "</td>" +
         "<td id=\"user_firstname_" + user_id_str + "\">" + user.firstName + "</td>" +
         "<td id=\"user_lastname_" + user_id_str + "\">" + user.lastName + "</td>" +
         "<td id=\"user_username_" + user_id_str + "\">" + user.username + "</td>" +
         "<td><button type=\"button\" class=\"btn btn-outline-primary btn-sm\" onclick=\"showModal("+user_id_str+", 'edit')\">Edit</button></td>" +
         "<td><button type=\"button\" class=\"btn btn-outline-danger btn-sm\" onclick=\"showModal("+user_id_str+", 'delete')\">Delete</button></td>" +
         "</tr>");
        });
    });
}

function showTab(tab_name) {
    if (tab_name == 'tab_userlist') {
        $("#tab_userlist").addClass("show");
        $("#tab_userlist").addClass("active");
        $("#tab_userform").removeClass("show");
        $("#tab_userform").removeClass("active");

        $("#tab_btn_userlist").addClass("active");
        $("#tab_btn_userform").removeClass("active");
    } else {
        $("#tab_userlist").removeClass("show");
        $("#tab_userlist").removeClass("active");
        $("#tab_userform").addClass("show");
        $("#tab_userform").addClass("active");

        $("#tab_btn_userform").addClass("active");
        $("#tab_btn_userlist").removeClass("active");
    }
}

function showModal(user_id, action) {
    $('#modal_user_form')[0].reset();

    if (action == "edit") {
        $("#modal_action").val("edit");
        $("#modal_user_form :input").attr("disabled", false);
        $('#modal_submit').text('Save');
        $("#modal_submit").addClass("btn-outline-primary");
        $("#modal_submit").removeClass("btn-outline-danger");
    } else {
        $("#modal_action").val("delete");
        $("#modal_user_form :input").attr("disabled", true);
        $('#modal_submit').text('Delete');
        $("#modal_submit").addClass("btn-outline-danger");
        $("#modal_submit").removeClass("btn-outline-primary");
    }

    $("#modal_user_id").val($("#user_id_" + user_id).text());
    $("#modal_firstName").val($("#user_firstname_" + user_id).text());
    $("#modal_lastName").val($("#user_lastname_" + user_id).text());
    $("#modal_username").val($("#user_username_" + user_id).text());


    $('#modal_form').modal('show');

}

function submitUserForm() {
    user = {
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "username": $("#username").val(),
        "password": $("#password").val(),
    }

    $.ajax("/admin/create", {
        data : JSON.stringify(user),
        contentType : 'application/json',
        type : 'POST',
        success: function(new_user) {
            new_id = new_user.id;
            $("#users_table").append("<tr id=\"user_row_" + new_id + "\">" +
                     "<td id=\"user_id_" + new_id + "\">" + new_id + "</td>" +
                     "<td id=\"user_firstname_" + new_id + "\">" + $("#firstName").val() + "</td>" +
                     "<td id=\"user_lastname_" + new_id + "\">" + $("#lastName").val() + "</td>" +
                     "<td id=\"user_username_" + new_id + "\">" + $("#username").val() + "</td>" +
                     "<td><button type=\"button\" class=\"btn btn-outline-primary btn-sm\" onclick=\"showModal("+new_id+", 'edit')\">Edit</button></td>" +
                     "<td><button type=\"button\" class=\"btn btn-outline-danger btn-sm\" onclick=\"showModal("+new_id+", 'delete')\">Delete</button></td>" +
                     "</tr>");
            $('#user_form')[0].reset();
            showTab("tab_userlist");
        }
    })
}

function submitModalForm() {
    action = $("#modal_action").val();
    user_id = $("#modal_user_id").val();

    if(action == "delete") {
        $.get( "/admin/delete?id="+user_id, function() {
            var row = document.getElementById("user_row_" + user_id);
            row.parentNode.removeChild(row);
            $('#modal_form').modal('hide');
        })
    } else {
        user = {
            "id": user_id,
            "firstName": $("#modal_firstName").val(),
            "lastName": $("#modal_lastName").val(),
            "username": $("#modal_username").val(),
            "password": $("#modal_password").val(),
        }

        $.ajax("/admin/edit", {
            data : JSON.stringify(user),
            contentType : 'application/json',
            type : 'POST',
            success: function() {
                $("#user_firstname_"+user_id).text($("#modal_firstName").val())
                $("#user_lastname_"+user_id).text($("#modal_lastName").val())
                $("#user_username_"+user_id).text($("#modal_username").val())
                $('#modal_form').modal('hide');
            }
        })
    }
}

